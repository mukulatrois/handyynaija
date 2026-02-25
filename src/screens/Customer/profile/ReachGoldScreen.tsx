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
    icon: 'information-circle-outline' as const,
    title: 'Complete 500 services',
    subtitle: '248/500 services completed',
    met: false,
  },
  {
    id: '2',
    icon: 'information-circle-outline' as const,
    title: 'Maintain rating 4.8+',
    subtitle: 'Current rating: 4.7 (Close)',
    met: false,
  },
  {
    id: '3',
    icon: 'checkmark-circle' as const,
    title: 'Exceptional service record',
    subtitle: 'No violations - excellent history',
    met: true,
  },
  {
    id: '4',
    icon: 'checkmark-circle' as const,
    title: 'Consistent performance',
    subtitle: '6 months of active services',
    met: true,
  },
];

const goldBenefits = [
  'Only 10% commission (save 5% more!)',
  'Premium Visibility & top Placement',
  'Elite Professional badge & VIP support',
  'Exclusive promotional opportunities',
];

export default function ReachGoldScreen() {
  const allRequirementsMet = false; // 245/500 services, not yet at 500

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="chevron-back" size={scale(24)} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Reach Gold Level</Text>
          <Text style={styles.headerSubtitle}>You are currently on Silver</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Details - Top */}
        <View style={styles.progressDetailsCard}>
          <View style={styles.progressDetailsHeader}>
            <Icon name="document-text-outline" size={scale(20)} color={colors.primary} />
            <Text style={styles.progressDetailsTitle}>Progress Details</Text>
          </View>
          <View style={styles.progressItem}>
            <Icon name="checkmark-circle" size={scale(20)} color={colors.primary} />
            <View style={styles.progressItemContent}>
              <Text style={styles.progressItemLabel}>Service completed</Text>
              <View style={styles.progressBarRow}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, styles.progressBarFillGreen, { width: '49%' }]} />
                </View>
                <Text style={styles.progressPercent}>49%</Text>
              </View>
              <Text style={styles.progressSubtitle}>248/500 services completed</Text>
            </View>
          </View>
          <View style={styles.progressItem}>
            <Icon name="checkmark-circle" size={scale(20)} color={colors.primary} />
            <View style={styles.progressItemContent}>
              <Text style={styles.progressItemLabel}>Ratings</Text>
              <View style={styles.progressBarRow}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, styles.progressBarFillGreen, { width: '98%' }]} />
                </View>
                <Text style={styles.progressPercent}>98%</Text>
              </View>
              <Text style={styles.progressSubtitle}>4.7/4.8 ratings</Text>
            </View>
          </View>
        </View>

        {/* Requirements for Gold */}
        <Text style={styles.sectionTitle}>Requirements for Gold</Text>
        {requirements.map((req) => (
          <View key={req.id} style={styles.requirementCard}>
            <View style={[styles.requirementIconWrap, req.met && styles.requirementIconWrapMet]}>
              <Icon
                name={req.icon}
                size={scale(22)}
                color={req.met ? colors.primary : colors.textSecondary}
              />
            </View>
            <View style={styles.requirementText}>
              <Text style={styles.requirementTitle}>
                {req.title}
                {req.id === '2' && ' ⭐'}
              </Text>
              <Text style={styles.requirementSubtitle}>{req.subtitle}</Text>
            </View>
          </View>
        ))}

        {/* Gold Benefits - Orange Card */}
        <View style={styles.goldBenefitsCard}>
          <View style={styles.goldBenefitsHeader}>
            <Icon name="trophy-outline" size={scale(22)} color="#CA8A04" />
            <Text style={styles.goldBenefitsTitle}>Gold Benefits Awaiting you</Text>
          </View>
          {goldBenefits.map((benefit, index) => (
            <View key={index} style={styles.benefitRow}>
              <Icon name="checkmark-circle" size={scale(20)} color={colors.primary} />
              <Text style={styles.goldBenefitText}>{benefit}</Text>
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
            Reach Gold (complete Requirements)
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
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: padding.lg,
  },
  requirementIconWrapMet: {
    backgroundColor: '#DCFCE7',
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
    marginBottom: margin.xl,
  },
  progressDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
    marginBottom: margin.lg,
  },
  progressDetailsTitle: {
    fontSize: fontSize(16),
    fontWeight: '700',
    color: colors.text,
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
  goldBenefitsCard: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    borderRadius: borderRadius.lg,
    padding: padding.xl,
    marginBottom: margin.xxl,
  },
  goldBenefitsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
    marginBottom: margin.lg,
  },
  goldBenefitsTitle: {
    fontSize: fontSize(16),
    fontWeight: '700',
    color: colors.text,
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
  goldBenefitText: {
    flex: 1,
    fontSize: fontSize(14),
    color: colors.text,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EA580C',
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
