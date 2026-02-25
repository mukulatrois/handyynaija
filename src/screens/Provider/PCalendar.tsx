import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSize, padding, borderRadius, scale } from '../../utils/responsive';
import { colors } from '../../theme/colors';
import { HandleBar, CloseButton } from '../../components';
import { navigate } from '../../navigation/navigationService';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Convert JS Sunday=0 to Monday=0 system
  const startOffset = (firstDay.getDay() + 6) % 7;

  const totalDays = lastDay.getDate();
  const cells: (number | null)[] = [];

  for (let i = 0; i < startOffset; i++) {
    cells.push(null);
  }

  for (let d = 1; d <= totalDays; d++) {
    cells.push(d);
  }

  return cells;
}


function isWeekend(year: number, month: number, day: number): boolean {
  const date = new Date(year, month, day);
  const dow = date.getDay();
  return dow === 0 || dow === 6;
}

export default function PCalendar() {
  const today = new Date();
  const updateSheetRef = useRef<any>(null);

  const [viewDate, setViewDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );

  const [availabilityExpanded, setAvailabilityExpanded] = useState(true);

  const calendarDays = useMemo(
    () => getCalendarDays(viewDate.year, viewDate.month),
    [viewDate.year, viewDate.month]
  );

  const goPrevMonth = () => {
    let newYear = viewDate.year;
    let newMonth = viewDate.month - 1;

    if (newMonth < 0) {
      newYear -= 1;
      newMonth = 11;
    }

    setViewDate({ year: newYear, month: newMonth });
    setSelectedDate(new Date(newYear, newMonth, 1));
  };

  const goNextMonth = () => {
    let newYear = viewDate.year;
    let newMonth = viewDate.month + 1;

    if (newMonth > 11) {
      newYear += 1;
      newMonth = 0;
    }

    setViewDate({ year: newYear, month: newMonth });
    setSelectedDate(new Date(newYear, newMonth, 1));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>

        <TouchableOpacity style={styles.syncButton} activeOpacity={0.8}>
          <Icon
            name="logo-google"
            size={scale(18)}
            color={colors.primary}
            style={styles.syncIcon}
          />
          <Text style={styles.syncButtonText}>G Sync</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Month Navigation */}
        <View style={styles.monthNav}>
          <TouchableOpacity onPress={goPrevMonth} style={styles.navArrow}>
            <Icon name="chevron-back" size={scale(24)} color={colors.text} />
          </TouchableOpacity>

          <Text style={styles.monthLabel}>
            {MONTHS[viewDate.month]} {viewDate.year}
          </Text>

          <TouchableOpacity onPress={goNextMonth} style={styles.navArrow}>
            <Icon name="chevron-forward" size={scale(24)} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Week Header */}
        <View style={styles.daysHeader}>
          {DAYS.map((day, i) => (
            <Text
              key={i}
              style={[
                styles.dayHeaderText,
                (i === 5 || i === 6) && styles.weekendText,
              ]}
            >
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar Grid - rows of 7 so Sunday column always shows */}
        <View style={styles.calendarGrid}>
          {Array.from({ length: Math.ceil(calendarDays.length / 7) }, (_, rowIndex) => {
            const rowDays = calendarDays.slice(rowIndex * 7, rowIndex * 7 + 7);
            const paddedRow = [...rowDays];
            while (paddedRow.length < 7) paddedRow.push(null);
            return (
            <View key={`row-${rowIndex}`} style={styles.calendarRow}>
              {paddedRow.map((day, colIndex) => {
                const i = rowIndex * 7 + colIndex;
                if (day === null) {
                  return <View key={`empty-${i}`} style={styles.cell} />;
                }

                const currentDate = new Date(
                  viewDate.year,
                  viewDate.month,
                  day
                );

                const weekend = isWeekend(
                  viewDate.year,
                  viewDate.month,
                  day
                );

                const selected =
                  selectedDate.getFullYear() === currentDate.getFullYear() &&
                  selectedDate.getMonth() === currentDate.getMonth() &&
                  selectedDate.getDate() === currentDate.getDate();

                const isToday =
                  today.getFullYear() === currentDate.getFullYear() &&
                  today.getMonth() === currentDate.getMonth() &&
                  today.getDate() === currentDate.getDate();

                return (
                  <TouchableOpacity
                    key={`${viewDate.year}-${viewDate.month}-${day}`}
                    style={styles.cell}
                    onPress={() => setSelectedDate(currentDate)}
                    activeOpacity={0.7}
                  >
                    {selected ? (
                      <View style={styles.selectedCircle}>
                        <Text style={styles.selectedText}>{day}</Text>
                      </View>
                    ) : (
                      <Text
                        style={[
                          styles.dateText,
                          weekend && styles.weekendDateText,
                          isToday && styles.todayText,
                        ]}
                      >
                        {day}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
            );
          })}
        </View>

        {/* Availability Section */}
        <View style={styles.availabilityBlock}>
          <TouchableOpacity
            style={styles.availabilityArrowWrap}
            onPress={() =>
              setAvailabilityExpanded(!availabilityExpanded)
            }
          >
            <Icon
              name={
                availabilityExpanded
                  ? 'chevron-up'
                  : 'chevron-down'
              }
              size={scale(20)}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          {availabilityExpanded && (
            <View style={styles.availabilitySection}>
              <Text style={styles.availabilityText}>
                13:45 - 20:00 Available
              </Text>
            </View>
          )}
        </View>

        {/* Update Button */}
        <TouchableOpacity
          style={styles.updateButton}
          activeOpacity={0.8}
          onPress={() => updateSheetRef.current?.open()}
        >
          <Text style={styles.updateButtonText}>
            Update Calendar
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Sheet */}
      <RBSheet
        ref={updateSheetRef}
        height={380}
        openDuration={250}
        draggable
        customStyles={{
          container: styles.sheet,
        }}
      >
        <HandleBar />

        <View style={styles.sheetHeader}>
          <View style={{ width: scale(40) }} />

          <View style={styles.sheetIconWrapper}>
            <Icon
              name="calendar-outline"
              size={scale(48)}
              color={colors.primary}
            />
            <View style={styles.warningBadge}>
              <Icon
                name="warning"
                size={scale(14)}
                color={colors.white}
              />
            </View>
          </View>

          <CloseButton
            onPress={() => updateSheetRef.current?.close()}
          />
        </View>

        <Text style={styles.sheetTitle}>
          Update your schedule.
        </Text>

        <Text style={styles.sheetMessage}>
          It's been a while since you created an event,
          keeping your schedule updated helps you avoid
          declining requests.
        </Text>

        <View style={styles.sheetButtons}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => updateSheetRef.current?.close()}
          >
            <Text style={styles.cancelButtonText}>
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sheetUpdateButton}
            onPress={() => {
              updateSheetRef.current?.close();
              navigate('UpdateEvent');
            }}
          >
            <Text style={styles.sheetUpdateButtonText}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: '700',
    color: colors.text,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.sm,
    borderRadius: borderRadius.round,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  syncIcon: { marginRight: padding.xs },
  syncButtonText: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: colors.primary,
  },
  scrollContent: {
    paddingHorizontal: padding.lg,
    paddingBottom: padding.xxl,
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: padding.lg,
  },
  monthLabel: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: colors.text,
  },
  daysHeader: { flexDirection: 'row', marginBottom: padding.sm },
  dayHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSize(14),
    fontWeight: '600',
    color: colors.text,
  },
  weekendText: { color: colors.error },
  calendarGrid: {},
  calendarRow: {
    flexDirection: 'row',
    width: '100%',
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: fontSize(16),
    color: colors.textSecondary,
  },
  weekendDateText: { color: colors.error },
  todayText: {
    fontWeight: '700',
    color: colors.primary,
  },
  selectedCircle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.white,
  },
  availabilityBlock: { marginTop: padding.lg },
  availabilityArrowWrap: { alignItems: 'center' },
  availabilitySection: { paddingVertical: padding.sm },
  availabilityText: {
    textAlign: 'center',
    fontSize: fontSize(16),
    color: colors.text,
  },
  updateButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: padding.lg,
    alignItems: 'center',
    marginTop: padding.xl,
  },
  updateButtonText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.white,
  },
  sheet: {
    borderTopLeftRadius: borderRadius.xxxl,
    borderTopRightRadius: borderRadius.xxxl,
    paddingHorizontal: padding.xl,
    paddingTop: padding.md,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: padding.lg,
  },
  sheetIconWrapper: { position: 'relative', alignItems: 'center' },
  warningBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: fontSize(22),
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: padding.md,
  },
  sheetMessage: {
    fontSize: fontSize(15),
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: padding.xl,
  },
  sheetButtons: { flexDirection: 'row' },
  cancelButton: {
    flex: 1,
    marginRight: padding.sm,
    paddingVertical: padding.lg,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.primary,
  },
  sheetUpdateButton: {
    flex: 1,
    marginLeft: padding.sm,
    paddingVertical: padding.lg,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  sheetUpdateButtonText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.white,
  },
});