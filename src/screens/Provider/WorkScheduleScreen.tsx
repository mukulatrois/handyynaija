import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack, navigate } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../utils/responsive';
import CustomIcon, { IconNames } from '../../components/Icon';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function WorkScheduleScreen() {
  const [activeDays, setActiveDays] = useState<Record<string, boolean>>(
    DAYS.reduce((acc, day) => ({ ...acc, [day]: false }), {}),
  );

  const toggleDay = (day: string, value: boolean) => {
    setActiveDays((prev) => ({ ...prev, [day]: value }));
  };

  const hasActiveDay = Object.values(activeDays).some(Boolean);

  const handleContinue = () => {
    if (hasActiveDay) {
      navigate('ProviderTabs');
    }
  };

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.row}>
      <Text style={styles.dayText}>{item}</Text>
      <View style={styles.switchRow}>
        <Text style={styles.statusText}>
          {activeDays[item] ? 'Activate' : 'Not Activate'}
        </Text>
        <Switch
          value={activeDays[item]}
          onValueChange={(value) => toggleDay(item, value)}
          trackColor={{ false: '#E0E0E0', true: '#3FA565' }}
          thumbColor="#fff"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with back arrow and progress bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton} activeOpacity={0.7}>
          <CustomIcon name={IconNames.arrowBack} size={scale(24)} color="#3FA565" />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '35%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Work Schedule</Text>
        <Text style={styles.subtitle}>
          When are you available to offer your services?
        </Text>

        <FlatList
          data={DAYS}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={styles.list}
        />

        {/* Continue Button */}
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
      </View>
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
    backgroundColor: '#3FA565',
    borderRadius: scale(10),
  },
  content: {
    flex: 1,
    paddingHorizontal: padding.xl,
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: 'bold',
    color: '#3FA565',
    marginBottom: margin.sm,
  },
  subtitle: {
    fontSize: fontSize(16),
    color: '#444',
    marginBottom: margin.xl,
  },
  list: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: padding.lg,
    paddingHorizontal: padding.md,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  dayText: {
    fontSize: fontSize(16),
    color: '#000',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.md,
  },
  statusText: {
    fontSize: fontSize(14),
    color: '#666',
  },
  continueBtn: {
    backgroundColor: '#3FA565',
    paddingVertical: padding.lg,
    borderRadius: scale(10),
    alignItems: 'center',
    marginBottom: margin.xl,
    marginTop: margin.lg,
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
});
