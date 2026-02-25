import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack } from '../../../navigation/navigationService';
import { scale, fontSize, padding, margin, borderRadius } from '../../../utils/responsive';
import { Button } from '../../../components';
import CustomIcon, { IconNames } from '../../../components/Icon';
import ServiceScreenHeader from './ServiceScreenHeader';

const TOTAL_STEPS = 5;

const STEPS = [
  {
    id: 0,
    title: 'Want to offer your services on HandyNaija?',
    subtitle: 'Create your professional profile and start earning money',
    titleAlign: 'center' as const,
    subtitleAlign: 'center' as const,
    buttonText: 'Become a professional',
    showDots: false,
  },
  {
    id: 1,
    title: 'Offer your at-home services',
    subtitle: "Let us know where you can travel to, when you're available, and what services you want to offer.",
    titleAlign: 'left' as const,
    subtitleAlign: 'left' as const,
    buttonText: 'Next',
    showDots: true,
    activeDot: 1,
  },
  {
    id: 2,
    title: 'Perform the services',
    subtitle: 'Complete the services for which you have been booked.',
    titleAlign: 'center' as const,
    subtitleAlign: 'center' as const,
    buttonText: 'Next',
    showDots: true,
    activeDot: 2,
  },
  {
    id: 3,
    title: 'Get Customers',
    subtitle: 'Service requests for customers or actively apply for job leads.',
    titleAlign: 'left' as const,
    subtitleAlign: 'left' as const,
    buttonText: 'Next',
    showDots: true,
    activeDot: 3,
  },
  {
    id: 4,
    title: 'Earn money',
    subtitle: 'Receive the payment for the services you have provided on your account.',
    titleAlign: 'center' as const,
    subtitleAlign: 'center' as const,
    buttonText: 'Next',
    showDots: true,
    activeDot: 4,
  },
];

export default function BecomeProfessionalIntroScreen() {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ServiceScreenHeader
        title={step === 0 ? 'Become a professional' : 'Become a professional'}
        showBack
        onBackPress={goBack}
        backLabel={step === 0 ? 'Profile' : undefined}
        rightElement={
          step > 0 ? (
            <TouchableOpacity onPress={goBack}>
              <Text style={styles.exitText}>Exit</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.illustrationPlaceholder}>
          <Text style={styles.illustrationHint}>Illustration</Text>
        </View>

        <Text
          style={[
            styles.title,
            STEPS[step].titleAlign === 'left' && styles.titleLeft,
          ]}
        >
          {STEPS[step].title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            STEPS[step].subtitleAlign === 'left' && styles.subtitleLeft,
          ]}
        >
          {STEPS[step].subtitle}
        </Text>

        {STEPS[step].showDots && (
          <View style={styles.dotsRow}>
            {Array.from({ length: 4 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i + 1 === STEPS[step].activeDot && styles.dotActive,
                ]}
              />
            ))}
          </View>
        )}

        <Button
          title={STEPS[step].buttonText}
          onPress={handleNext}
          variant="primary"
          style={step === 0 ? { marginTop: 0 } : { marginTop: margin.lg }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.xl,
    paddingVertical: padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: fontSize(20),
    color: '#3FA565',
    marginRight: padding.sm,
  },
  profileLink: {
    fontSize: fontSize(16),
    color: '#3FA565',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: fontSize(16),
    color: '#000',
    fontWeight: '600',
  },
  headerSpacer: { flex: 1 },
  exitText: {
    fontSize: fontSize(16),
    color: '#3FA565',
    fontWeight: '600',
  },
  scrollContent: {
    padding: padding.xl,
    paddingBottom: margin.xxxl,
  },
  illustrationPlaceholder: {
    height: scale(200),
    backgroundColor: '#F5F5F5',
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: margin.xxl,
  },
  illustrationHint: {
    fontSize: fontSize(14),
    color: '#999',
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: margin.md,
    textAlign: 'center',
    paddingHorizontal: padding.lg,
  },
  titleLeft: {
    textAlign: 'left',
    paddingHorizontal: 0,
  },
  subtitle: {
    fontSize: fontSize(16),
    color: '#000',
    lineHeight: fontSize(22),
    marginBottom: margin.xxl,
    textAlign: 'center',
    paddingHorizontal: padding.lg,
  },
  subtitleLeft: {
    textAlign: 'left',
    paddingHorizontal: 0,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: margin.xxl,
    gap: scale(8),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#E0E0E0',
  },
  dotActive: {
    backgroundColor: '#3FA565',
  },
});
