import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { goBack, navigate } from '../../../navigation/navigationService';
import { COLORS } from '../../../utils/constants';

const PRIMARY_GREEN = COLORS.PRIMARY;

const DURATION_STEPS = [
  '30min','45min','1h','1h 15min','1h 30min','1h 45min',
  '2h','2h 15min','2h 30min','2h 45min',
  '3h','3h 30min','4h','4h 15min','4h 30min','4h 45min',
  '5h','5h 15min','5h 30min','5h 45min','6h',
];

const START_HOURS = Array.from({ length: 18 }, (_, i) => i + 6);

const WEEK_DAYS = [
  { name: 'Monday', available: true },
  { name: 'Tuesday', available: false },
  { name: 'Wednesday', available: false },
  { name: 'Thursday', available: false },
  { name: 'Friday', available: true },
  { name: 'Saturday', available: false },
  { name: 'Sunday', available: false },
];

function getNextDays(count: number) {
  const days: { dayName: string; date: number }[] = [];
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      dayName: dayNames[d.getDay()],
      date: d.getDate(),
    });
  }
  return days;
}

export default function SelectDateTimeScreen() {
  const [recurrence, setRecurrence] = useState<'once' | 'weekly'>('once');
  const [durationIndex, setDurationIndex] = useState(7);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedWeekDay, setSelectedWeekDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const days = useMemo(() => getNextDays(14), []);
  const monthName = new Date().toLocaleString('default', { month: 'long' });

  const durationLabel = DURATION_STEPS[durationIndex];

  const durationHours =
    durationIndex >= 10
      ? 3 + (durationIndex - 10) * 0.5
      : 0.5 + durationIndex * 0.25;

  const showSurcharge = durationHours < 3;
  const canSubmit =
    recurrence === 'once'
      ? selectedTime !== null
      : selectedWeekDay !== null && selectedTime !== null;

  const handleSubmit = () => {
    if (!canSubmit) return;
    navigate('AddAddress', { fromBooking: true });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.recurrenceBtn}
          onPress={() =>
            setRecurrence(prev => (prev === 'once' ? 'weekly' : 'once'))
          }
        >
          <Ionicons name="repeat" size={18} />
          <Text style={styles.recurrenceText}>
            {recurrence === 'once' ? 'Just once' : 'Weekly'}
          </Text>
          <Ionicons name="chevron-down" size={18} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeBtn} onPress={goBack}>
          <Ionicons name="close" size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* DURATION */}
        <Text style={styles.sectionTitle}>
          Duration <Text style={styles.durationValue}>{durationLabel}</Text>
        </Text>

        <Slider
          minimumValue={0}
          maximumValue={DURATION_STEPS.length - 1}
          step={1}
          value={durationIndex}
          minimumTrackTintColor={PRIMARY_GREEN}
          maximumTrackTintColor="#E5E5E5"
          thumbTintColor={PRIMARY_GREEN}
          onValueChange={(val: number) => setDurationIndex(val)}
        />

        <View style={styles.divider} />

        {/* ===== JUST ONCE VIEW ===== */}
        {recurrence === 'once' && (
          <View style={{ marginBottom: 25 }}>
            <View style={styles.monthRow}>
              <Text style={styles.sectionTitle}>{monthName}</Text>
              <TouchableOpacity style={styles.showMonthBtn}>
                <Text style={styles.showMonthText}>Show month</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {days.map((day, i) => {
                const isSelected = i === selectedDateIndex;
                return (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.dayCard,
                      isSelected && styles.dayCardSelected,
                    ]}
                    onPress={() => setSelectedDateIndex(i)}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        isSelected && styles.dayTextSelected,
                      ]}
                    >
                      {day.dayName}
                    </Text>
                    <Text
                      style={[
                        styles.dateText,
                        isSelected && styles.dayTextSelected,
                      ]}
                    >
                      {day.date}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* ===== WEEKLY VIEW ===== */}
        {recurrence === 'weekly' && (
          <View style={{ marginBottom: 25 }}>
            {WEEK_DAYS.map((day) => (
              <TouchableOpacity
                key={day.name}
                style={styles.weekRow}
                disabled={!day.available}
                onPress={() => setSelectedWeekDay(day.name)}
              >
                <Text
                  style={[
                    styles.weekText,
                    !day.available && styles.weekDisabled,
                    selectedWeekDay === day.name && styles.weekSelected,
                  ]}
                >
                  {day.name}
                </Text>

                {day.available ? (
                  <Ionicons name="add" size={22} />
                ) : (
                  <Text style={styles.notAvailable}>Not Available</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* START TIME */}
        <Text style={styles.sectionTitle}>Start time</Text>

        <View style={styles.timeGrid}>
          {START_HOURS.map((h) => {
            const time = `${h}:00`;
            const isSelected = selectedTime === time;

            return (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeCard,
                  isSelected && styles.timeCardSelected,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    isSelected && styles.timeTextSelected,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* BOTTOM */}
      <View style={styles.bottomCard}>
        {showSurcharge && (
          <Text style={styles.surchargeText}>
            Reach 3h to avoid a surcharge of ₦11.00
          </Text>
        )}

        <TouchableOpacity
          style={[
            styles.primaryBtn,
            !canSubmit && styles.primaryBtnDisabled,
          ]}
          disabled={!canSubmit}
          onPress={handleSubmit}
        >
          <Text
            style={[
              styles.primaryBtnText,
              !canSubmit && styles.primaryBtnTextDisabled,
            ]}
          >
            Select start time
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

  recurrenceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },

  recurrenceText: {
    fontSize: 16,
    fontWeight: '500',
  },

  closeBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollContent: {
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },

  durationValue: {
    color: PRIMARY_GREEN,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 25,
  },

  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  showMonthBtn: {
    backgroundColor: '#eee',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },

  showMonthText: {
    fontSize: 14,
    color: '#666',
  },

  dayCard: {
    width: 70,
    paddingVertical: 14,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    alignItems: 'center',
  },

  dayCardSelected: {
    borderColor: PRIMARY_GREEN,
    backgroundColor: '#E6F4EC',
  },

  dayText: {
    fontSize: 13,
    color: '#666',
  },

  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  dayTextSelected: {
    color: PRIMARY_GREEN,
    fontWeight: '600',
  },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },

  weekText: {
    fontSize: 18,
    fontWeight: '600',
  },

  weekDisabled: {
    color: '#999',
  },

  weekSelected: {
    color: PRIMARY_GREEN,
  },

  notAvailable: {
    color: '#999',
    fontSize: 16,
  },

  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  timeCard: {
    width: '31%',
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    alignItems: 'center',
  },

  timeCardSelected: {
    borderColor: PRIMARY_GREEN,
    backgroundColor: PRIMARY_GREEN,
  },

  timeText: {
    fontSize: 15,
    color: '#444',
  },

  timeTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },

  bottomCard: {
    backgroundColor: '#F4F4F4',
    padding: 20,
  },

  surchargeText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },

  primaryBtn: {
    backgroundColor: PRIMARY_GREEN,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  primaryBtnDisabled: {
    backgroundColor: '#E0E0E0',
  },

  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  primaryBtnTextDisabled: {
    color: '#9E9E9E',
  },
});