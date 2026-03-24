import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  scale,
  fontSize,
  padding,
  margin,
  borderRadius,
} from '../../utils/responsive';
import { colors } from '../../theme/colors';
import { goBack, navigate } from '../../navigation/navigationService';
import { Button } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setActiveStep,
  setPhoneNumber,
  resetListingDraft,
} from '../../store/listingDraftSlice';
import { saveListingDraftBackupToLocalStorage } from '../../utils/listingDraftStorage';
import { COLORS } from '../../utils/constants';

const PRIMARY_GREEN = COLORS.PRIMARY;

export default function ListingPhoneScreen() {
  const dispatch = useAppDispatch();
  const draft = useAppSelector((s) => s.listingDraft);
  const phoneNumber = draft.phoneNumber ?? '';
  const countryCode = '+234';

  useEffect(() => {
    dispatch(setActiveStep('listingPhone'));
  }, [dispatch]);

  const canContinue = phoneNumber.trim().length > 0;

  const handleContinue = () => {
    if (!canContinue) return;
    dispatch(setActiveStep('listingVerification'));
    navigate('ListingVerification');
  };

  const handleSaveAndExit = async () => {
    dispatch(setActiveStep('listingPhone'));
    await saveListingDraftBackupToLocalStorage({
      ...draft,
      activeStep: 'listingPhone',
      updatedAt: Date.now(),
    });
    // Clear redux values immediately after saving backup.
    dispatch(resetListingDraft());
    navigate('ProviderTabs' as any, { screen: 'Listings' } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '40%' }]} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.headerButton}>
            <Icon name="chevron-back" size={scale(24)} color={PRIMARY_GREEN} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSaveAndExit}
            style={styles.saveExitButton}
            activeOpacity={0.7}
          >
            <Text style={styles.saveExitText}>Save and exit</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Enter your phone</Text>

          {/* Phone Input - composite field */}
          <View style={styles.phoneContainer}>
            <TouchableOpacity
              style={styles.countryCodeSection}
              activeOpacity={0.7}
            >
              <Text style={styles.flag}>🇳🇬</Text>
              <Text style={styles.countryCode}>{countryCode}</Text>
              <Icon
                name="chevron-down"
                size={scale(16)}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter phone number"
              placeholderTextColor={colors.textMuted}
              value={phoneNumber}
              onChangeText={(text) => dispatch(setPhoneNumber(text))}
              keyboardType="phone-pad"
            />
          </View>

          <Button
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            style={styles.continueButton}
            disabled={!canContinue}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  progressBar: {
    height: scale(4),
    backgroundColor: colors.border,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: PRIMARY_GREEN,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerButton: {
    minWidth: scale(40),
  },
  saveExitButton: {
    padding: padding.xs,
  },
  saveExitText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: padding.xl,
    paddingTop: margin.xxl,
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: '700',
    color: PRIMARY_GREEN,
    marginBottom: margin.xxl,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.borderLight,
    borderRadius: borderRadius.lg,
    marginBottom: margin.xxl,
    overflow: 'hidden',
  },
  countryCodeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.lg,
    gap: padding.sm,
  },
  flag: {
    fontSize: fontSize(20),
  },
  countryCode: {
    fontSize: fontSize(16),
    color: colors.text,
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    fontSize: fontSize(16),
    color: colors.text,
    paddingVertical: padding.lg,
    paddingHorizontal: padding.lg,
  },
  continueButton: {
    marginTop: margin.md,
  },
});
