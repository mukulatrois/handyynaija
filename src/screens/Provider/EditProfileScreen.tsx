import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput as RNTextInput,
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
const NAME_MAX_LENGTH = 50;
const ABOUT_MAX_LENGTH = 200;

export default function EditProfileScreen() {
  const [name, setName] = useState('Paschaloliver');
  const [email] = useState('Paschaloliver@example.com');
  const [phone, setPhone] = useState('');
  const [about, setAbout] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Icon name="chevron-back" size={scale(24)} color={PRIMARY_GREEN} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit profile</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Picture */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.cameraButton} activeOpacity={0.7}>
                <Icon name="camera" size={scale(16)} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Input Fields */}
          <View style={styles.inputSection}>
            <View style={styles.inputWithCounter}>
              <RNTextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Name"
                placeholderTextColor={colors.textMuted}
                maxLength={NAME_MAX_LENGTH}
              />
              <Text style={styles.charCount}>
                {name.length}/{NAME_MAX_LENGTH}
              </Text>
            </View>

            <RNTextInput
              style={styles.input}
              value={email}
              placeholder="Email"
              placeholderTextColor={colors.textMuted}
              editable={false}
            />

            <RNTextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone"
              placeholderTextColor={colors.textMuted}
              keyboardType="phone-pad"
            />
          </View>

          {/* About me */}
          <Text style={styles.aboutHeading}>About me</Text>
          <View style={styles.aboutContainer}>
            <RNTextInput
              style={styles.aboutInput}
              value={about}
              onChangeText={setAbout}
              placeholder="Write a description about you..."
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              maxLength={ABOUT_MAX_LENGTH}
            />
            <Text style={styles.charCountBottom}>
              {about.length}/{ABOUT_MAX_LENGTH}
            </Text>
          </View>

          {/* Save Button */}
          <Button
            title="Save"
            onPress={() => goBack()}
            variant="primary"
            style={styles.saveButton}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: padding.md,
  },
  headerTitle: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: padding.xl,
    paddingTop: padding.xxl,
    paddingBottom: margin.xxxl,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: margin.xl,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    backgroundColor: colors.borderLight,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: PRIMARY_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  inputSection: {
    marginBottom: margin.lg,
  },
  inputWithCounter: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: borderRadius.lg,
    padding: padding.lg,
    fontSize: fontSize(16),
    color: colors.text,
    marginBottom: margin.md,
  },
  charCount: {
    position: 'absolute',
    right: padding.lg,
    top: padding.lg,
    fontSize: fontSize(14),
    color: colors.textMuted,
  },
  aboutHeading: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.text,
    marginBottom: padding.sm,
  },
  aboutContainer: {
    position: 'relative',
    marginBottom: margin.xl,
  },
  aboutInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: borderRadius.lg,
    padding: padding.lg,
    paddingBottom: padding.xxxl,
    fontSize: fontSize(16),
    color: colors.text,
    minHeight: scale(100),
    textAlignVertical: 'top',
  },
  charCountBottom: {
    position: 'absolute',
    bottom: padding.md,
    right: padding.lg,
    fontSize: fontSize(14),
    color: colors.textMuted,
  },
  saveButton: {},
});
