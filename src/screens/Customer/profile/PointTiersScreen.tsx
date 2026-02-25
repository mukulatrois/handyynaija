import React, { useState } from 'react';
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
import { goBack, navigate } from '../../../navigation/navigationService';

type Tier = 'bronze' | 'silver' | 'gold';

const TIER_COLORS = {
  bronze: { bg: '#DCFCE7', border: '#166534', icon: '#B45309' },
  silver: { bg: '#DCFCE7', border: '#166534', icon: '#6B7280' },
  gold: { bg: '#DCFCE7', border: '#166534', icon: '#CA8A04' },
};

const TIER_COMMISSIONS: Record<Tier, string> = {
  bronze: '20%',
  silver: '15%',
  gold: '10%',
};

export default function PointTiersScreen() {
  const [selectedTier, setSelectedTier] = useState<Tier>('bronze');

  const tiers: { id: Tier; label: string }[] = [
    { id: 'bronze', label: 'Bronze' },
    { id: 'silver', label: 'Silver' },
    { id: 'gold', label: 'Gold' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="chevron-back" size={scale(24)} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Point Tiers</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tier Selection */}
        <View style={styles.tierRow}>
          {tiers.map((tier) => {
            const isActive = selectedTier === tier.id;
            const tierColors = TIER_COLORS[tier.id];
            return (
              <TouchableOpacity
                key={tier.id}
                style={[
                  styles.tierCard,
                  {
                    backgroundColor: isActive ? tierColors.bg : '#F3F4F6',
                    borderColor: isActive ? tierColors.border : '#E5E7EB',
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => setSelectedTier(tier.id)}
              >
                <Icon
                  name="medal-outline"
                  size={scale(28)}
                  color={tierColors.icon}
                />
                <Text
                  style={[
                    styles.tierCardLabel,
                    { color: isActive ? tierColors.border : colors.textSecondary },
                  ]}
                >
                  {tier.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Level Details Card - varies by tier */}
        {selectedTier === 'bronze' && (
          <>
            <View style={styles.bronzeDetailsCard}>
              <View style={styles.bronzeCardHeader}>
                <Icon name="medal-outline" size={scale(28)} color="#B45309" />
                <Text style={styles.bronzeCardTitle}>Bronze Level</Text>
              </View>
              <Text style={styles.statusText}>Listing is visible</Text>
              <Text style={styles.goalText}>Complete 200 services</Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '60%' }]} />
              </View>
              <Text style={styles.progressLabel}>Service completed</Text>
              <Text style={styles.progressCount}>120/200 services completed</Text>
              <Text style={styles.remainingText}>
                80 more services to reach Silver
              </Text>
            </View>
            <View style={styles.tipBox}>
              <Icon name="megaphone-outline" size={scale(20)} color="#DC2626" />
              <Text style={styles.tipText}>
                Complete more services and get better reviews to reduce commission
              </Text>
            </View>
          </>
        )}

        {selectedTier === 'silver' && (
          <>
            <View style={styles.silverDetailsCard}>
              <View style={styles.silverCardHeader}>
                <Icon name="medal-outline" size={scale(28)} color="#6B7280" />
                <Text style={styles.silverCardTitle}>Silver Level</Text>
              </View>
              <Text style={styles.silverSubtitle}>
                Higher visibility + Trust badge
              </Text>
              <Text style={styles.goalText}>Complete 500 services for Gold</Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '49%' }]} />
              </View>
              <Text style={styles.progressLabel}>Service completed</Text>
              <Text style={styles.progressCount}>245/500 services completed</Text>
              <Text style={styles.remainingText}>
                255 more services to reach Gold
              </Text>
            </View>
            <View style={styles.silverAchievedCard}>
              <Icon name="medal-outline" size={scale(28)} color="#166534" />
              <View style={styles.silverAchievedText}>
                <Text style={styles.silverAchievedTitle}>Silver Achieved!</Text>
                <Text style={styles.silverAchievedDesc}>
                  You're now enjoying 15% commission and priority placement. Keep
                  up the excellent work!
                </Text>
              </View>
            </View>
            <Text style={styles.benefitsTitle}>Your Current Benefits</Text>
            <View style={styles.currentBenefitsList}>
              <View style={styles.benefitRow}>
                <Icon name="checkmark-circle" size={scale(20)} color={colors.primary} />
                <View>
                  <Text style={styles.benefitRowTitle}>15% commission</Text>
                  <Text style={styles.benefitRowSub}>save 5% compared to bronze</Text>
                </View>
              </View>
              <View style={styles.benefitRow}>
                <Icon name="checkmark-circle" size={scale(20)} color={colors.primary} />
                <View>
                  <Text style={styles.benefitRowTitle}>Priority Listing Placement</Text>
                  <Text style={styles.benefitRowSub}>Appear higher in search result</Text>
                </View>
              </View>
              <View style={styles.benefitRow}>
                <Icon name="checkmark-circle" size={scale(20)} color={colors.primary} />
                <View>
                  <Text style={styles.benefitRowTitle}>Trusted Professional Badge</Text>
                  <Text style={styles.benefitRowSub}>Build customer confidence</Text>
                </View>
              </View>
            </View>
          </>
        )}

        {selectedTier === 'gold' && (
          <>
            <View style={styles.goldDetailsCard}>
              <View style={styles.goldCardHeader}>
                <Icon name="medal-outline" size={scale(28)} color="#CA8A04" />
                <Text style={styles.goldCardTitle}>Gold Level</Text>
              </View>
              <Text style={styles.goldSubtitle}>
                Top-tier Professional - Maximum benefits
              </Text>
              <View style={styles.goldReachedCard}>
                <Text style={styles.goldReachedTitle}>You've Reached the Top!</Text>
                <View style={styles.goldStatsRow}>
                  <Text style={styles.goldStatLabel}>Total Services</Text>
                  <Text style={styles.goldStatValue}>540</Text>
                </View>
                <View style={styles.goldStatsRow}>
                  <Text style={styles.goldStatLabel}>Average Rating</Text>
                  <Text style={styles.goldStatValue}>4.9+ ⭐</Text>
                </View>
              </View>
              <Text style={styles.goldCongrats}>
                Congratulations! You're among the top 5% of professionals
              </Text>
            </View>
            <View style={styles.eliteStatusCard}>
              <Icon name="trophy-outline" size={scale(28)} color="#BE185D" />
              <View style={styles.eliteStatusText}>
                <Text style={styles.eliteStatusTitle}>Elite Professional Status</Text>
                <Text style={styles.eliteStatusDesc}>
                  You've achieved the Highest tier, enjoying exclusive benefits,
                  VIP support, and maximum earnings.
                </Text>
              </View>
            </View>
            <Text style={styles.benefitsTitle}>Tier Benefits</Text>
            <View style={[styles.benefitsRow, { marginBottom: margin.xl }]}>
              {tiers.map((tier) => {
                const isActive = selectedTier === tier.id;
                const tierColors = TIER_COLORS[tier.id];
                return (
                  <View
                    key={tier.id}
                    style={[
                      styles.benefitCard,
                      {
                        backgroundColor: isActive ? tierColors.bg : '#F3F4F6',
                        borderColor: isActive ? tierColors.border : '#E5E7EB',
                      },
                    ]}
                  >
                    <Icon
                      name="medal-outline"
                      size={scale(20)}
                      color={tierColors.icon}
                    />
                    <Text
                      style={[
                        styles.benefitLabel,
                        { color: isActive ? tierColors.border : colors.textSecondary },
                      ]}
                    >
                      {tier.label}
                    </Text>
                    <Text
                      style={[
                        styles.benefitCommission,
                        { color: isActive ? tierColors.border : colors.textSecondary },
                      ]}
                    >
                      {TIER_COMMISSIONS[tier.id]}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.sectionHeader}>
              <Icon name="star" size={scale(18)} color={colors.primary} />
              <Text style={styles.benefitsTitle}>Your Gold Benefits</Text>
            </View>
            <View style={styles.currentBenefitsList}>
              <View style={styles.benefitRow}>
                <Icon name="checkmark-circle" size={scale(20)} color={colors.primary} />
                <View>
                  <Text style={styles.benefitRowTitle}>Only 10% Commission</Text>
                  <Text style={styles.benefitRowSub}>Save 10% compared to bronze</Text>
                </View>
              </View>
              <View style={styles.benefitRow}>
                <Icon name="checkmark-circle" size={scale(20)} color={colors.primary} />
                <View>
                  <Text style={styles.benefitRowTitle}>Premium Visibility</Text>
                  <Text style={styles.benefitRowSub}>Top placement in all search results</Text>
                </View>
              </View>
              <View style={styles.benefitRow}>
                <Icon name="checkmark-circle" size={scale(20)} color={colors.primary} />
                <View>
                  <Text style={styles.benefitRowTitle}>Elite Pro Badge</Text>
                  <Text style={styles.benefitRowSub}>Premium Trust indicator on profile</Text>
                </View>
              </View>
              <View style={styles.benefitRow}>
                <Icon name="checkmark-circle" size={scale(20)} color={colors.primary} />
                <View>
                  <Text style={styles.benefitRowTitle}>VIP Support Access</Text>
                  <Text style={styles.benefitRowSub}>Dedicated support team & Priority response</Text>
                </View>
              </View>
              <View style={styles.benefitRow}>
                <Icon name="checkmark-circle" size={scale(20)} color={colors.primary} />
                <View>
                  <Text style={styles.benefitRowTitle}>Exclusive Opportunities</Text>
                  <Text style={styles.benefitRowSub}>Early access to premium clients & promotions</Text>
                </View>
              </View>
            </View>
            <View style={styles.sectionHeader}>
              <Icon name="star" size={scale(18)} color={colors.primary} />
              <Text style={styles.benefitsTitle}>Maintain Your Gold Status</Text>
            </View>
            <View style={styles.maintainCard}>
              <Text style={styles.maintainText}>
                Keep providing exceptional service to maintain your Gold tier
                benefits. Continue with 4.8+ ratings and quality service.
              </Text>
              <View style={styles.maintainRatingRow}>
                <Text style={styles.maintainLabel}>Current Rating</Text>
                <View style={styles.maintainProgressRow}>
                  <View style={styles.maintainProgressBg}>
                    <View style={[styles.maintainProgressFill, { width: '90%' }]} />
                  </View>
                  <Text style={styles.maintainRatingValue}>4.9 ⭐</Text>
                </View>
              </View>
              <View style={styles.exceedingRow}>
                <Icon name="checkmark-circle" size={scale(20)} color={colors.primary} />
                <Text style={styles.exceedingText}>Exceeding Gold tier requirements</Text>
              </View>
            </View>
          </>
        )}

        {/* Tier Benefits - hidden for Gold (shown inline in Gold block) */}
        {selectedTier !== 'gold' && (
          <>
        <Text style={styles.benefitsTitle}>Tier Benefits</Text>
        <View style={styles.benefitsRow}>
          {tiers.map((tier) => {
            const isActive = selectedTier === tier.id;
            const tierColors = TIER_COLORS[tier.id];
            return (
              <View
                key={tier.id}
                style={[
                  styles.benefitCard,
                  {
                    backgroundColor: isActive ? tierColors.bg : '#F3F4F6',
                    borderColor: isActive ? tierColors.border : '#E5E7EB',
                  },
                ]}
              >
                <Icon
                  name="medal-outline"
                  size={scale(20)}
                  color={tierColors.icon}
                />
                <Text
                  style={[
                    styles.benefitLabel,
                    { color: isActive ? tierColors.border : colors.textSecondary },
                  ]}
                >
                  {tier.label}
                </Text>
                <Text
                  style={[
                    styles.benefitCommission,
                    // styles.benefitCommission,
                    { color: isActive ? tierColors.border : colors.textSecondary },
                  ]}
                >
                  {TIER_COMMISSIONS[tier.id]}
                </Text>
              </View>
            );
          })}
        </View>
          </>
        )}

        {/* CTA Button */}
        {selectedTier !== 'gold' && (
          <TouchableOpacity
            style={[styles.ctaButton, selectedTier === 'silver' && styles.ctaButtonOrange]}
            activeOpacity={0.7}
            onPress={() =>
              selectedTier === 'bronze'
                ? navigate('ReachSilver')
                : navigate('ReachGold')
            }
          >
            <Icon
              name={selectedTier === 'silver' ? 'trophy-outline' : 'trending-up-outline'}
              size={scale(22)}
              color={colors.white}
            />
            <Text style={styles.ctaButtonText}>
              See how to reach {selectedTier === 'bronze' ? 'Silver' : 'Gold'} Level
            </Text>
          </TouchableOpacity>
        )}

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
    justifyContent: 'space-between',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: padding.xs,
  },
  headerTitle: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: colors.text,
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
  tierRow: {
    flexDirection: 'row',
    gap: padding.md,
    marginBottom: margin.xl,
  },
  tierCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: padding.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
  },
  tierCardLabel: {
    fontSize: fontSize(13),
    fontWeight: '600',
    marginTop: padding.xs,
  },
  bronzeDetailsCard: {
    backgroundColor: '#C2410C',
    borderRadius: borderRadius.lg,
    padding: padding.xl,
    marginBottom: margin.lg,
  },
  silverDetailsCard: {
    backgroundColor: '#64748B',
    borderRadius: borderRadius.lg,
    padding: padding.xl,
    marginBottom: margin.lg,
  },
  goldDetailsCard: {
    backgroundColor: '#EA580C',
    borderRadius: borderRadius.lg,
    padding: padding.xl,
    marginBottom: margin.lg,
  },
  goldCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
    marginBottom: padding.xs,
  },
  goldCardTitle: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: colors.white,
  },
  goldSubtitle: {
    fontSize: fontSize(14),
    color: 'rgba(255,255,255,0.95)',
    marginBottom: margin.md,
  },
  goldReachedCard: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: borderRadius.md,
    padding: padding.lg,
    marginBottom: margin.md,
  },
  goldReachedTitle: {
    fontSize: fontSize(16),
    fontWeight: '700',
    color: colors.white,
    marginBottom: margin.md,
  },
  goldStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: padding.sm,
  },
  goldStatLabel: {
    fontSize: fontSize(14),
    color: 'rgba(255,255,255,0.9)',
  },
  goldStatValue: {
    fontSize: fontSize(15),
    fontWeight: '700',
    color: colors.white,
  },
  goldCongrats: {
    fontSize: fontSize(13),
    color: 'rgba(255,255,255,0.95)',
  },
  eliteStatusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCE7F3',
    borderRadius: borderRadius.lg,
    padding: padding.xl,
    marginBottom: margin.xl,
    gap: padding.lg,
    borderWidth: 1,
    borderColor: '#FBCFE8',
  },
  eliteStatusText: {
    flex: 1,
  },
  eliteStatusTitle: {
    fontSize: fontSize(16),
    fontWeight: '700',
    color: colors.text,
    marginBottom: padding.xs,
  },
  eliteStatusDesc: {
    fontSize: fontSize(14),
    color: colors.textSecondary,
    lineHeight: fontSize(20),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
    marginBottom: margin.md,
  },
  maintainCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: padding.xl,
    marginBottom: margin.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  maintainText: {
    fontSize: fontSize(14),
    color: colors.text,
    lineHeight: fontSize(20),
    marginBottom: margin.lg,
  },
  maintainRatingRow: {
    marginBottom: margin.md,
  },
  maintainLabel: {
    fontSize: fontSize(13),
    color: colors.textSecondary,
    marginBottom: padding.xs,
  },
  maintainProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
  },
  maintainProgressBg: {
    flex: 1,
    height: scale(6),
    backgroundColor: colors.border,
    borderRadius: borderRadius.round,
    overflow: 'hidden',
  },
  maintainProgressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.round,
  },
  maintainRatingValue: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: colors.text,
  },
  exceedingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
  },
  exceedingText: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: colors.primary,
  },
  silverCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
    marginBottom: padding.xs,
  },
  silverCardTitle: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: colors.white,
  },
  silverSubtitle: {
    fontSize: fontSize(14),
    color: 'rgba(255,255,255,0.9)',
    marginBottom: margin.md,
  },
  silverAchievedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: padding.xl,
    marginBottom: margin.xl,
    gap: padding.lg,
  },
  silverAchievedText: {
    flex: 1,
  },
  silverAchievedTitle: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: colors.white,
    marginBottom: padding.xs,
  },
  silverAchievedDesc: {
    fontSize: fontSize(14),
    color: 'rgba(255,255,255,0.95)',
    lineHeight: fontSize(20),
  },
  currentBenefitsList: {
    marginBottom: margin.xl,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: padding.sm,
    marginBottom: margin.md,
  },
  benefitRowTitle: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: colors.text,
  },
  benefitRowSub: {
    fontSize: fontSize(12),
    color: colors.textSecondary,
    marginTop: padding.xs,
  },
  bronzeCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
    marginBottom: padding.xs,
  },
  bronzeCardTitle: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: colors.white,
  },
  statusText: {
    fontSize: fontSize(14),
    color: 'rgba(255,255,255,0.9)',
    marginBottom: margin.md,
  },
  goalText: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: colors.white,
    marginBottom: padding.xs,
  },
  progressBarBg: {
    height: scale(8),
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: borderRadius.round,
    overflow: 'hidden',
    marginBottom: padding.xs,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#84CC16',
    borderRadius: borderRadius.round,
  },
  progressLabel: {
    fontSize: fontSize(12),
    color: 'rgba(255,255,255,0.9)',
  },
  progressCount: {
    fontSize: fontSize(13),
    fontWeight: '600',
    color: colors.white,
    marginBottom: padding.xs,
  },
  remainingText: {
    fontSize: fontSize(13),
    color: 'rgba(255,255,255,0.9)',
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    padding: padding.lg,
    borderRadius: borderRadius.lg,
    marginBottom: margin.xl,
    gap: padding.sm,
  },
  tipText: {
    flex: 1,
    fontSize: fontSize(13),
    color: colors.text,
  },
  benefitsTitle: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.text,
    marginBottom: margin.md,
  },
  benefitsRow: {
    flexDirection: 'row',
    gap: padding.md,
    marginBottom: margin.xxl,
  },
  benefitCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: padding.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
  },
  benefitLabel: {
    fontSize: fontSize(12),
    fontWeight: '600',
    marginTop: padding.xs,
  },
  benefitCommission: {
    fontSize: fontSize(14),
    fontWeight: '700',
    marginTop: padding.xs,
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
  ctaButtonOrange: {
    backgroundColor: '#EA580C',
  },
  ctaButtonText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.white,
  },
});
