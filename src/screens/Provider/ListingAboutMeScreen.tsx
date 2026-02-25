import React, { useState } from 'react';
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
import { goBack } from '../../navigation/navigationService';
import { Button } from '../../components';

const PRIMARY_GREEN = '#3FA565';

const guidelines = [
  { text: 'Brief your personal description', good: true },
  { text: 'Working methods', good: true },
  { text: 'Why they should book you', good: true },
  { text: 'Links to web page', good: false },
];

export default function ListingAboutMeScreen() {
  const [description, setDescription] = useState('');

  const handleContinue = () => {
    // TODO: Save and proceed
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
            onPress={goBack}
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
            onChangeText={setDescription}
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
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            style={styles.continueButton}
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
