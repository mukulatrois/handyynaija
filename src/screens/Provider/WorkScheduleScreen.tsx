import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { goBack, navigate } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../utils/responsive';
import CustomIcon, { IconNames } from '../../components/Icon';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigationService';
import { COLORS } from '../../utils/constants';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const PICKER_ITEM_HEIGHT = scale(44);

type TimeSlot = { from: string; until: string };
type DaySchedule = { available: boolean; slots: TimeSlot[] };
type TimePickerTarget = { day: string; slotIndex: number; field: 'from' | 'until' };

const defaultSlot: TimeSlot = { from: '', until: '' };

function parseTime(s: string): { hour: number; minute: number } {
  const [h, m] = s.split(':').map(Number);
  return {
    hour: Number.isNaN(h) ? 8 : Math.max(0, Math.min(23, h)),
    minute: Number.isNaN(m) ? 0 : Math.max(0, Math.min(59, m)),
  };
}

function formatTime(hour: number, minute: number): string {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function getInitialSchedule(): Record<string, DaySchedule> {
  return DAYS.reduce<Record<string, DaySchedule>>(
    (acc, day) => ({
      ...acc,
      [day]: { available: false, slots: [] },
    }),
    {},
  );
}

export default function WorkScheduleScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'ProviderWorkSchedule'>>();
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>(
    getInitialSchedule(),
  );
  const [timePickerTarget, setTimePickerTarget] = useState<TimePickerTarget | null>(null);
  const [pickerHour, setPickerHour] = useState(8);
  const [pickerMinute, setPickerMinute] = useState(0);
  const hourWheelRef = useRef<ScrollView>(null);
  const minuteWheelRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!timePickerTarget) return;
    const t = setTimeout(() => {
      const paddingY = PICKER_ITEM_HEIGHT * 2;
      const hourIdx = HOURS.indexOf(pickerHour);
      const minIdx = MINUTES.indexOf(pickerMinute);
      hourWheelRef.current?.scrollTo({
        y: Math.max(0, hourIdx * PICKER_ITEM_HEIGHT),
        animated: false,
      });
      minuteWheelRef.current?.scrollTo({
        y: Math.max(0, minIdx * PICKER_ITEM_HEIGHT),
        animated: false,
      });
    }, 100);
    return () => clearTimeout(t);
  }, [timePickerTarget]);

  const openTimePicker = (day: string, slotIndex: number, field: 'from' | 'until') => {
    const slot = schedule[day]?.slots[slotIndex];
    if (!slot) return;
    const parsed = parseTime(slot[field] || '00:00');
    setPickerHour(parsed.hour);
    setPickerMinute(MINUTES.includes(parsed.minute) ? parsed.minute : MINUTES[0]);
    setTimePickerTarget({ day, slotIndex, field });
  };

  const closeTimePicker = () => setTimePickerTarget(null);

  const confirmTimePicker = () => {
    if (!timePickerTarget) return;
    const { day, slotIndex, field } = timePickerTarget;
    const value = formatTime(pickerHour, pickerMinute);
    updateSlot(day, slotIndex, field, value);
    closeTimePicker();
  };

  const toggleDay = (day: string, value: boolean) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: value
        ? { ...prev[day], available: true, slots: [{ ...defaultSlot }] }
        : { ...prev[day], available: false, slots: [] },
    }));
  };

  const addHours = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { ...defaultSlot }],
      },
    }));
  };

  const removeSlot = (day: string, index: number) => {
    setSchedule((prev) => {
      const slots = prev[day].slots.filter((_, i) => i !== index);
      return {
        ...prev,
        [day]: { ...prev[day], slots },
      };
    });
  };

  const updateSlot = (
    day: string,
    index: number,
    field: 'from' | 'until',
    value: string,
  ) => {
    setSchedule((prev) => {
      const slots = [...prev[day].slots];
      slots[index] = { ...slots[index], [field]: value };
      return { ...prev, [day]: { ...prev[day], slots } };
    });
  };

  const hasActiveDay = Object.values(schedule).some(
    (d) => d.available && d.slots.length > 0,
  );

  const renderWheel = (
    options: number[],
    value: number,
    onChange: (v: number) => void,
    scrollRef?: React.RefObject<ScrollView | null>,
  ) => {
    const paddingY = PICKER_ITEM_HEIGHT * 2;
    return (
      <ScrollView
        ref={scrollRef}
        style={styles.wheel}
        showsVerticalScrollIndicator={false}
        snapToInterval={PICKER_ITEM_HEIGHT}
        decelerationRate="fast"
        contentContainerStyle={{ paddingVertical: paddingY }}
        onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          const y = e.nativeEvent.contentOffset.y;
          const i = Math.round((y + paddingY) / PICKER_ITEM_HEIGHT);
          const clamped = Math.max(0, Math.min(i, options.length - 1));
          onChange(options[clamped]);
        }}
      >
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.wheelItem, { height: PICKER_ITEM_HEIGHT }]}
            onPress={() => onChange(opt)}
          >
            <Text
              style={[
                styles.wheelItemText,
                value === opt && styles.wheelItemTextSelected,
              ]}
            >
              {String(opt).padStart(2, '0')}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const handleContinue = () => {
    if (hasActiveDay) {
      navigate('ProviderProfileInfo', route.params ? { ...route.params } : undefined);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton} activeOpacity={0.7}>
          <CustomIcon name={IconNames.arrowBack} size={scale(24)} color={COLORS.PRIMARY} />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '88%' }]} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Work Schedule</Text>
        <Text style={styles.subtitle}>
          When are you available to offer your services?
        </Text>

        {DAYS.map((day) => {
          const { available, slots } = schedule[day];
          return (
            <View key={day} style={styles.dayBlock}>
              <View style={styles.dayRow}>
                <Text style={styles.dayText}>{day}</Text>
                <View style={styles.switchRow}>
                  <Text style={styles.statusText}>
                    {available ? 'Available' : 'Not available'}
                  </Text>
                  <Switch
                    value={available}
                    onValueChange={(v) => toggleDay(day, v)}
                    trackColor={{ false: '#E0E0E0', true: '#3FA565' }}
                    thumbColor="#fff"
                  />
                </View>
              </View>
              {available && (
                <>
                  {slots.map((slot, index) => (
                    <View key={`${day}-${index}`} style={styles.slotRow}>
                      <TouchableOpacity
                        style={styles.timeInput}
                        onPress={() => openTimePicker(day, index, 'from')}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.timeInputText,
                            !slot.from && styles.timeInputPlaceholder,
                          ]}
                        >
                          {slot.from || 'From'}
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.dash}>-</Text>
                      <TouchableOpacity
                        style={styles.timeInput}
                        onPress={() => openTimePicker(day, index, 'until')}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.timeInputText,
                            !slot.until && styles.timeInputPlaceholder,
                          ]}
                        >
                          {slot.until || 'Until'}
                        </Text>
                      </TouchableOpacity>
                     
                    </View>
                  ))}
              
                </>
              )}
            </View>
          );
        })}

        <TouchableOpacity
          disabled={!hasActiveDay}
          style={[styles.continueBtn, !hasActiveDay && styles.disabledBtn]}
          onPress={handleContinue}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.continueText,
              !hasActiveDay && styles.disabledText,
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Time selector modal */}
      <Modal
        isVisible={timePickerTarget !== null}
        onBackdropPress={closeTimePicker}
        onBackButtonPress={closeTimePicker}
        backdropOpacity={0.5}
        style={styles.timePickerModal}
        avoidKeyboard
      >
        <View style={styles.timePickerContainer}>
          <Text style={styles.timePickerTitle}>Select time</Text>
          <View style={styles.timePickerWheels}>
            {renderWheel(HOURS, pickerHour, setPickerHour, hourWheelRef)}
            <Text style={styles.timePickerColon}>:</Text>
            {renderWheel(MINUTES, pickerMinute, setPickerMinute, minuteWheelRef)}
          </View>
          <View style={styles.timePickerButtons}>
            <TouchableOpacity
              style={styles.timePickerCancelBtn}
              onPress={closeTimePicker}
              activeOpacity={0.7}
            >
              <Text style={styles.timePickerCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timePickerDoneBtn}
              onPress={confirmTimePicker}
              activeOpacity={0.7}
            >
              <Text style={styles.timePickerDoneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.xl,
    paddingVertical: padding.lg,
    paddingBottom: padding.md,
    gap: padding.md,
  },
  backButton: {
    padding: padding.xs,
  },
  progressBar: {
    flex: 1,
    height: scale(6),
    backgroundColor: '#E0E0E0',
    borderRadius: scale(10),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: scale(10),
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: padding.xl,
    paddingBottom: padding.xl,
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: margin.sm,
  },
  subtitle: {
    fontSize: fontSize(16),
    color: '#444',
    marginBottom: margin.xl,
  },
  dayBlock: {
    marginBottom: margin.xl,
    paddingBottom: margin.lg,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: margin.md,
  },
  dayText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#000',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
  },
  statusText: {
    fontSize: fontSize(14),
    color: '#666',
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: margin.sm,
    gap: padding.sm,
  },
  timeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: scale(8),
    paddingHorizontal: padding.md,
    paddingVertical: padding.sm,
    justifyContent: 'center',
    minWidth: scale(70),
  },
  timeInputText: {
    fontSize: fontSize(15),
    color: '#000',
  },
  timeInputPlaceholder: {
    color: '#999',
  },
  dash: {
    fontSize: fontSize(16),
    color: '#666',
  },
  removeBtn: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addHoursWrap: {
    alignSelf: 'flex-start',
    marginTop: margin.xs,
  },
  addHoursText: {
    fontSize: fontSize(15),
    color: '#3FA565',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  continueBtn: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: padding.lg,
    borderRadius: scale(10),
    alignItems: 'center',
    marginTop: margin.lg,
    marginBottom: margin.xl,
  },
  disabledBtn: {
    backgroundColor: '#E0E0E0',
  },
  continueText: {
    color: '#fff',
    fontSize: fontSize(16),
    fontWeight: '600',
  },
  disabledText: {
    color: '#555',
  },
  timePickerModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  timePickerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    paddingHorizontal: padding.lg,
    paddingTop: padding.lg,
    paddingBottom: padding.xl + scale(20),
  },
  timePickerTitle: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: '#333',
    marginBottom: margin.lg,
    textAlign: 'center',
  },
  timePickerWheels: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: scale(12),
    paddingVertical: padding.sm,
    marginBottom: margin.xl,
    minHeight: scale(160),
  },
  wheel: {
    width: scale(72),
    maxHeight: scale(160),
  },
  wheelItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelItemText: {
    fontSize: fontSize(18),
    color: '#999',
  },
  wheelItemTextSelected: {
    color: '#000',
    fontWeight: '600',
  },
  timePickerColon: {
    fontSize: fontSize(20),
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 4,
  },
  timePickerButtons: {
    flexDirection: 'row',
    gap: padding.md,
  },
  timePickerCancelBtn: {
    flex: 1,
    paddingVertical: padding.md,
    borderRadius: scale(10),
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
  },
  timePickerCancelText: {
    fontSize: fontSize(16),
    color: '#555',
    fontWeight: '600',
  },
  timePickerDoneBtn: {
    flex: 1,
    paddingVertical: padding.md,
    borderRadius: scale(10),
    backgroundColor: '#3FA565',
    alignItems: 'center',
  },
  timePickerDoneText: {
    fontSize: fontSize(16),
    color: '#fff',
    fontWeight: '600',
  },
});
