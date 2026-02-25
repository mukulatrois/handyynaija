import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSize, padding, borderRadius, scale } from '../../utils/responsive';
import { colors } from '../../theme/colors';
import { goBack } from '../../navigation/navigationService';

type DurationTab = 'one' | 'several' | 'weekly';

export default function UpdateEventScreen() {
  const [activeTab, setActiveTab] = useState<DurationTab>('one');
  const [title, setTitle] = useState('Lack of avilability');
  const [date, setDate] = useState('Sat, 11 Oct 2025');
  const [bookAllDay, setBookAllDay] = useState(false);
  const [hours, setHours] = useState('From 12:00 to 15:00');

  const handleUpdate = () => {
    goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton} hitSlop={12}>
          <Icon name="arrow-back" size={scale(24)} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
          <Text style={styles.scheduleLink}>my schedule</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.question}>When will you be unavailable?</Text>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'one' && styles.tabActive]}
            onPress={() => setActiveTab('one')}
          >
            <Text style={[styles.tabText, activeTab === 'one' && styles.tabTextActive]}>
              One day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'several' && styles.tabActive]}
            onPress={() => setActiveTab('several')}
          >
            <Text style={[styles.tabText, activeTab === 'several' && styles.tabTextActive]}>
              Several days
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'weekly' && styles.tabActive]}
            onPress={() => setActiveTab('weekly')}
          >
            <Text style={[styles.tabText, activeTab === 'weekly' && styles.tabTextActive]}>
              Weekly
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Title (optional)</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Date:</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="Select date"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Book all day</Text>
          <Switch
            value={bookAllDay}
            onValueChange={setBookAllDay}
            trackColor={{ false: colors.border, true: colors.primaryLight }}
            thumbColor={colors.white}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Hours you wish to unavailable</Text>
          <TextInput
            style={styles.input}
            value={hours}
            onChangeText={setHours}
            placeholder="From HH:MM to HH:MM"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdate}
          activeOpacity={0.8}
        >
          <Text style={styles.updateButtonText}>Update Event</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
  },
  backButton: {
    padding: padding.xs,
  },
  scheduleLink: {
    fontSize: fontSize(16),
    color: colors.primary,
    fontWeight: '500',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: padding.xl,
    paddingBottom: padding.xxl,
  },
  question: {
    fontSize: fontSize(22),
    fontWeight: '700',
    color: colors.primary,
    marginBottom: padding.xl,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: padding.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    paddingVertical: padding.md,
    marginRight: padding.xl,
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
    marginBottom: -1,
  },
  tabText: {
    fontSize: fontSize(16),
    color: colors.textSecondary,
    fontWeight: '500',
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  field: {
    marginBottom: padding.xl,
  },
  label: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: colors.text,
    marginBottom: padding.sm,
  },
  input: {
    backgroundColor: colors.backgroundGray,
    borderRadius: borderRadius.md,
    padding: padding.lg,
    fontSize: fontSize(16),
    color: colors.text,
    borderWidth: 0,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: padding.xl,
    paddingVertical: padding.sm,
  },
  toggleLabel: {
    fontSize: fontSize(16),
    color: colors.text,
  },
  updateButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: padding.lg,
    alignItems: 'center',
    marginTop: padding.lg,
  },
  updateButtonText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.white,
  },
});
