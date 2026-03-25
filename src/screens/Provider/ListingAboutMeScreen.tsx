import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  resetListingDraft,
  setActiveStep,
  setAboutMeDescription,
} from '../../store/listingDraftSlice';
import { saveListingDraftBackupToLocalStorage } from '../../utils/listingDraftStorage';
import { COLORS } from '../../utils/constants';

const PRIMARY_GREEN = COLORS.PRIMARY;

const guidelines = [
  { text: 'Brief your personal description', good: true },
  { text: 'Working methods', good: true },
  { text: 'Why they should book you', good: true },
  { text: 'Links to web page', good: false },
];

const AUTH_TOKEN_KEY = 'auth_accessToken';
const CREATE_LISTING_URL =
  'https://jolloyard-be.myfileshosting.com/api/v1/providers/listings';

// Maps UI option ids to backend numeric codes (as shown in your curl example).
const experienceLevelMap: Record<string, string> = {
  exp_0_2: '1',
  exp_2_5: '2',
  exp_5_15: '3',
  exp_15_plus: '4',
};

const worksInServiceIndustryMap: Record<string, string> = {
  industry_no: '1',
  industry_yes: '2',
};

const employmentStatusMap: Record<string, string> = {
  status_cleaning: '1',
  status_other: '2',
  status_student: '3',
};

const personalSituationMap: Record<string, string> = {
  statement_supplement: '1',
  statement_new: '2',
  statement_clients: '3',
  statement_free_schedule: '4',
};

export default function ListingAboutMeScreen() {
  const dispatch = useAppDispatch();
  const draft = useAppSelector((s) => s.listingDraft);
  const description = draft.aboutMeDescription ?? '';
  const [submitting, setSubmitting] = useState(false);

  const experienceLevel = experienceLevelMap[draft.experience ?? ''];
  const worksInServiceIndustry = worksInServiceIndustryMap[draft.industry ?? ''];
  const employmentStatus = employmentStatusMap[draft.status ?? ''];
  const personalSituation = personalSituationMap[draft.statement ?? ''];

  const canContinue = useMemo(() => {
    const hasDescription = description.trim().length > 0;
    const hasService = Boolean(draft.serviceId);
    const hasPrice = (draft.price ?? '').trim().length > 0;
    const hasImages = (draft.galleryImages ?? []).length > 0;
    const hasMappedFields =
      Boolean(experienceLevel) &&
      Boolean(worksInServiceIndustry) &&
      Boolean(employmentStatus) &&
      Boolean(personalSituation);

    return hasDescription && hasService && hasPrice && hasImages && hasMappedFields;
  }, [
    description,
    draft.galleryImages,
    draft.price,
    draft.serviceId,
    employmentStatus,
    experienceLevel,
    personalSituation,
    worksInServiceIndustry,
  ]);

  useEffect(() => {
    dispatch(setActiveStep('listingAboutMe'));
  }, [dispatch]);

  const handleContinue = async () => {
    if (!canContinue || submitting) return;

    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      Alert.alert('Session expired', 'Please log in again.');
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append('serviceId', String(draft.serviceId ?? ''));
      formData.append('pricePerHour', String(draft.price ?? '').trim());
      formData.append('description', description.trim());

      (draft.galleryImages ?? []).forEach((img, idx) => {
        if (!img.uri) return;
        // React Native expects file objects for multipart form uploads.
        formData.append('workImages', {
          uri: img.uri,
          type: img.type ?? 'image/jpeg',
          name: img.fileName ?? `work-image-${idx}.jpg`,
        } as any);
      });

      if (!experienceLevel || !worksInServiceIndustry || !employmentStatus || !personalSituation) {
        throw new Error('Invalid listing info selected.');
      }

      formData.append('experienceLevel', experienceLevel);
      formData.append('worksInServiceIndustry', worksInServiceIndustry);
      formData.append('employmentStatus', employmentStatus);
      formData.append('personalSituation', personalSituation);

      const res = await fetch(CREATE_LISTING_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // RN will handle the boundary; setting this header is usually ok for multipart.
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message =
          data?.message ?? data?.error ?? 'Failed to create listing. Please try again.';
        throw new Error(message);
      }

      // Move to phone step after successful creation.
      dispatch(setActiveStep('listingPhone'));
      navigate('ListingPhone');
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Something went wrong while creating listing.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '75%' }]} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.headerButton}>
            <Icon name="chevron-back" size={scale(24)} color={PRIMARY_GREEN} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              dispatch(setActiveStep('listingAboutMe'));
              await saveListingDraftBackupToLocalStorage({
                ...draft,
                activeStep: 'listingAboutMe',
                updatedAt: Date.now(),
              });
              // Clear redux values immediately after saving backup.
              dispatch(resetListingDraft());
              navigate('ProviderTabs' as any, { screen: 'Listings' } as any);
            }}
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
          <Text style={styles.title}>About me</Text>
          <Text style={styles.instructions}>
            Write a brief description about yourself and your services. This
            will be the first thing clients see on your profile, so be as
            professional as possible.
          </Text>

          <TextInput
            style={styles.descriptionInput}
            placeholder="Write a description about you....."
            placeholderTextColor={colors.textMuted}
            value={description}
            onChangeText={(text) => dispatch(setAboutMeDescription(text))}
            multiline
            textAlignVertical="top"
          />

          <Text style={styles.sectionTitle}>
            What makes a good description?
          </Text>
          {guidelines.map((item, index) => (
            <View key={index} style={styles.guidelineRow}>
              <Icon
                name={item.good ? 'checkmark-circle' : 'close-circle'}
                size={scale(20)}
                color={item.good ? PRIMARY_GREEN : colors.error}
                style={styles.guidelineIcon}
              />
              <Text
                style={[
                  styles.guidelineText,
                  !item.good && styles.guidelineTextBad,
                ]}
              >
                {item.text}
              </Text>
            </View>
          ))}

          <Button
            title={submitting ? 'Submitting...' : 'Continue'}
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
    paddingTop: margin.xl,
    paddingBottom: margin.xxxl,
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: '700',
    color: colors.text,
    marginBottom: padding.md,
  },
  instructions: {
    fontSize: fontSize(14),
    color: colors.textSecondary,
    lineHeight: fontSize(22),
    marginBottom: margin.lg,
  },
  descriptionInput: {
    minHeight: scale(120),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: padding.lg,
    fontSize: fontSize(16),
    color: colors.text,
    marginBottom: margin.xxl,
  },
  sectionTitle: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.text,
    marginBottom: margin.md,
  },
  guidelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: padding.sm,
  },
  guidelineIcon: {
    marginRight: padding.sm,
  },
  guidelineText: {
    fontSize: fontSize(14),
    color: colors.text,
    flex: 1,
  },
  guidelineTextBad: {
    color: colors.textSecondary,
  },
  continueButton: {
    marginTop: margin.xxl,
  },
});
