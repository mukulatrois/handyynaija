import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  scale,
  fontSize,
  padding,
  margin,
  borderRadius,
} from '../../../utils/responsive';
import { colors } from '../../../theme/colors';
import { goBack } from '../../../navigation/navigationService';

const requirements = [
  {
    id: '1',
    icon: 'time-outline' as const,
    title: 'Complete 200 services',
    subtitle: '120/200 services completed',
  },
  {
    id: '2',
    icon: 'star-outline' as const,
    title: 'Maintain rating 4.5+',
    subtitle: 'Current rating: 4.2',
  },
  {
    id: '3',
    icon: 'checkmark-circle-outline' as const,
    title: 'No policy violations',
    subtitle: 'Clean record',
  },
];

const silverBenefits = [
  'Lower commission (15%)',
  'Higher visibility',
  'Trust badge on profile',
];

export default function ReachSilverScreen() {
  const allRequirementsMet = false; // Not met: 120/200 services, rating 4.2 < 4.5

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="chevron-back" size={scale(24)} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Reach Silver Level</Text>
          <Text style={styles.headerSubtitle}>You are currently on Bronze</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Requirements */}
        <Text style={styles.sectionTitle}>Requirements</Text>
        {requirements.map((req) => (
          <View key={req.id} style={styles.requirementCard}>
            <View style={styles.requirementIconWrap}>
              <Icon
                name={req.icon}
                size={scale(22)}
                color={colors.primary}
              />
            </View>
            <View style={styles.requirementText}>
              <Text style={styles.requirementTitle}>{req.title}</Text>
              <Text style={styles.requirementSubtitle}>{req.subtitle}</Text>
            </View>
          </View>
        ))}

        {/* Progress Details */}
        <View style={styles.progressDetailsCard}>
          <Text style={styles.progressDetailsTitle}>Progress Details</Text>
          <View style={styles.progressItem}>
            <Icon name="checkmark-circle-outline" size={scale(20)} color={colors.primary} />
            <View style={styles.progressItemContent}>
              <Text style={styles.progressItemLabel}>Service completed</Text>
              <View style={styles.progressBarRow}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, styles.progressBarFillYellow, { width: '60%' }]} />
                </View>
                <Text style={styles.progressPercent}>60%</Text>
              </View>
              <Text style={styles.progressSubtitle}>120/200 services completed</Text>
            </View>
          </View>
          <View style={styles.progressItem}>
            <Icon name="checkmark-circle-outline" size={scale(20)} color={colors.primary} />
            <View style={styles.progressItemContent}>
              <Text style={styles.progressItemLabel}>Ratings</Text>
              <View style={styles.progressBarRow}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, styles.progressBarFillGreen, { width: '96%' }]} />
                </View>
                <Text style={styles.progressPercent}>96%</Text>
              </View>
              <Text style={styles.progressSubtitle}>4.3/4.5 ratings</Text>
            </View>
          </View>
        </View>

        {/* Silver Benefits */}
        <View style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>Silver Benefits</Text>
          {silverBenefits.map((benefit, index) => (
            <View key={index} style={styles.benefitRow}>
              <Icon name="checkmark-circle" size={scale(20)} color={colors.primary} />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        {/* CTA Button - disabled when requirements not met */}
        <TouchableOpacity
          style={[styles.ctaButton, !allRequirementsMet && styles.ctaButtonDisabled]}
          activeOpacity={allRequirementsMet ? 0.7 : 1}
          onPress={() => allRequirementsMet && {}}
          disabled={!allRequirementsMet}
        >
          <Icon
            name="lock-closed-outline"
            size={scale(22)}
            color={allRequirementsMet ? colors.white : colors.textSecondary}
          />
          <Text
            style={[
              styles.ctaButtonText,
              !allRequirementsMet && styles.ctaButtonTextDisabled,
            ]}
          >
            Reach Silver (complete Requirements)
          </Text>
        </TouchableOpacity>

        <View style={{ height: margin.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: padding.xs,
    marginRight: padding.sm,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize(13),
    color: colors.textSecondary,
    marginTop: padding.xs,
  },
  headerSpacer: {
    width: scale(40),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: padding.xl,
    paddingTop: margin.xl,
  },
  sectionTitle: {
    fontSize: fontSize(16),
    fontWeight: '700',
    color: colors.text,
    marginBottom: margin.md,
  },
  requirementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: '#DCFCE7',
    borderRadius: borderRadius.lg,
    padding: padding.lg,
    marginBottom: margin.md,
  },
  requirementIconWrap: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: padding.lg,
  },
  requirementText: {
    flex: 1,
  },
  requirementTitle: {
    fontSize: fontSize(15),
    fontWeight: '600',
    color: colors.text,
  },
  requirementSubtitle: {
    fontSize: fontSize(13),
    color: colors.textSecondary,
    marginTop: padding.xs,
  },
  progressDetailsCard: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1.5,
    borderColor: '#DCFCE7',
    borderRadius: borderRadius.lg,
    padding: padding.xl,
    marginTop: margin.lg,
    marginBottom: margin.xl,
  },
  progressDetailsTitle: {
    fontSize: fontSize(16),
    fontWeight: '700',
    color: colors.text,
    marginBottom: margin.lg,
  },
  progressItem: {
    flexDirection: 'row',
    marginBottom: margin.lg,
  },
  progressItemContent: {
    flex: 1,
    marginLeft: padding.md,
  },
  progressItemLabel: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: colors.text,
    marginBottom: padding.xs,
  },
  progressBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
    marginBottom: padding.xs,
  },
  progressBarBg: {
    flex: 1,
    height: scale(8),
    backgroundColor: colors.border,
    borderRadius: borderRadius.round,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: borderRadius.round,
  },
  progressBarFillYellow: {
    backgroundColor: '#F59E0B',
  },
  progressBarFillGreen: {
    backgroundColor: colors.primary,
  },
  progressPercent: {
    fontSize: fontSize(13),
    fontWeight: '600',
    color: colors.text,
    minWidth: scale(36),
    textAlign: 'right',
  },
  progressSubtitle: {
    fontSize: fontSize(12),
    color: colors.textSecondary,
  },
  benefitsCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: borderRadius.lg,
    padding: padding.xl,
    marginBottom: margin.xxl,
  },
  benefitsTitle: {
    fontSize: fontSize(16),
    fontWeight: '700',
    color: colors.text,
    marginBottom: margin.lg,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: margin.md,
    gap: padding.sm,
  },
  benefitText: {
    flex: 1,
    fontSize: fontSize(14),
    color: colors.text,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: padding.lg,
    borderRadius: borderRadius.lg,
    gap: padding.sm,
  },
  ctaButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  ctaButtonText: {
    fontSize: fontSize(15),
    fontWeight: '600',
    color: colors.white,
  },
  ctaButtonTextDisabled: {
    color: colors.textSecondary,
  },
});
