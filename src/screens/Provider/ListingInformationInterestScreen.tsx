import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
  setExperience,
  setIndustry,
  setStatement,
  setStatus,
  resetListingDraft,
} from '../../store/listingDraftSlice';
import { saveListingDraftBackupToLocalStorage } from '../../utils/listingDraftStorage';
import { COLORS } from '../../utils/constants';

const PRIMARY_GREEN = COLORS.PRIMARY;

type Choice = { id: string; label: string };

const experienceOptions: Choice[] = [
  { id: 'exp_0_2', label: '0-2 years of experience' },
  { id: 'exp_2_5', label: '2-5 years of experience' },
  { id: 'exp_5_15', label: '5-15 years of experience' },
  { id: 'exp_15_plus', label: '+15 years of experience' },
];

const industryOptions: Choice[] = [
  { id: 'industry_yes', label: 'Yes' },
  { id: 'industry_no', label: 'No' },
];

const statusOptions: Choice[] = [
  { id: 'status_cleaning', label: 'I work professionally in cleaning.' },
  { id: 'status_other', label: 'I work professionally in another sector.' },
  { id: 'status_student', label: 'I am a student' },
];

const statementOptions: Choice[] = [
  {
    id: 'statement_supplement',
    label:
      'I am currently unemployed and looking for an extra income until I find a permanent job.',
  },
  {
    id: 'statement_new',
    label:
      'I already have a permanent job, and I am looking for an extra income in my free time.',
  },
  {
    id: 'statement_clients',
    label: 'I already have my own clients and want Jolloyard to help me fill my free slots.',
  },
  {
    id: 'statement_free_schedule',
    label: 'I do not have my own clients and want Jolloyard to help me fill my free schedule.',
  },
];

function RadioOption({
  option,
  selected,
  onPress,
}: {
  option: Choice;
  selected: boolean;
  onPress: (id: string) => void;
}) {
  return (
    <TouchableOpacity
      style={styles.radioRow}
      activeOpacity={0.75}
      onPress={() => onPress(option.id)}
    >
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioLabel}>{option.label}</Text>
    </TouchableOpacity>
  );
}

export default function ListingInformationInterestScreen() {
  const dispatch = useAppDispatch();
  const draft = useAppSelector((s) => s.listingDraft);

  const experience = draft.experience ?? '';
  const industry = draft.industry ?? '';
  const status = draft.status ?? '';
  const statement = draft.statement ?? '';

  useEffect(() => {
    dispatch(setActiveStep('listingInformationInterest'));
  }, [dispatch]);

  const canContinue = useMemo(
    () => !!experience && !!industry && !!status && !!statement,
    [experience, industry, status, statement]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '38%' }]} />
        </View>

        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.headerButton}>
            <Icon name="chevron-back" size={scale(24)} color={PRIMARY_GREEN} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              dispatch(setActiveStep('listingInformationInterest'));
              // Persist explicit JSON backup for "Save and exit".
              await saveListingDraftBackupToLocalStorage({
                ...draft,
                activeStep: 'listingInformationInterest',
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
          <Text style={styles.title}>Information of interest</Text>
          <Text style={styles.helperText}>Tell us more about yourself</Text>

          <Text style={styles.question}>How much experience do you have as a Service name?</Text>
          {experienceOptions.map((item) => (
            <RadioOption
              key={item.id}
              option={item}
              selected={experience === item.id}
              onPress={(id) => dispatch(setExperience(id))}
            />
          ))}

          <Text style={styles.question}>Do you currently work professionally in the service industry?</Text>
          <View style={styles.twoColRow}>
            {industryOptions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.twoColOption}
                activeOpacity={0.75}
                onPress={() => dispatch(setIndustry(item.id))}
              >
                <View style={[styles.radioOuter, industry === item.id && styles.radioOuterSelected]}>
                  {industry === item.id && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.question}>
            Indicate your current employment status (If you are currently Unemployed select what
            you are doing before)
          </Text>
          {statusOptions.map((item) => (
            <RadioOption
              key={item.id}
              option={item}
              selected={status === item.id}
              onPress={(id) => dispatch(setStatus(id))}
            />
          ))}

          <Text style={styles.question}>Select the statement that best describes your situation.</Text>
          {statementOptions.map((item) => (
            <RadioOption
              key={item.id}
              option={item}
              selected={statement === item.id}
              onPress={(id) => dispatch(setStatement(id))}
            />
          ))}
        </ScrollView>

        <View style={styles.bottomButtonWrap}>
          <Button
            title="Continue"
            onPress={() => {
              if (!canContinue) return;
              dispatch(setActiveStep('listingGallery'));
              navigate('ListingGallery');
            }}
            variant="primary"
            style={canContinue ? styles.continueButton : styles.continueButtonDisabled}
            disabled={!canContinue}
          />
        </View>
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
    paddingTop: margin.lg,
    paddingBottom: margin.xxxl,
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: '700',
    color: PRIMARY_GREEN,
    marginBottom: padding.xs,
  },
  helperText: {
    fontSize: fontSize(13),
    color: colors.textSecondary,
    marginBottom: margin.lg,
  },
  question: {
    fontSize: fontSize(15),
    color: colors.text,
    marginBottom: padding.sm,
    marginTop: margin.md,
    lineHeight: fontSize(22),
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: padding.sm,
    paddingRight: padding.md,
  },
  twoColRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: padding.sm,
    gap: padding.lg,
  },
  twoColOption: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioOuter: {
    width: scale(20),
    height: scale(20),
    borderRadius: borderRadius.round,
    borderWidth: 1.5,
    borderColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(1),
  },
  radioOuterSelected: {
    borderColor: PRIMARY_GREEN,
  },
  radioInner: {
    width: scale(10),
    height: scale(10),
    borderRadius: borderRadius.round,
    backgroundColor: PRIMARY_GREEN,
  },
  radioLabel: {
    flex: 1,
    marginLeft: padding.sm,
    fontSize: fontSize(13),
    color: colors.text,
    lineHeight: fontSize(19),
  },
  bottomButtonWrap: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: padding.xl,
    paddingVertical: padding.lg,
    backgroundColor: colors.white,
  },
  continueButton: {
    marginTop: 0,
  },
  continueButtonDisabled: {
    opacity: 0.55,
  },
});
