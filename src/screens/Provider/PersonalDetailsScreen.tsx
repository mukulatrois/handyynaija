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
import { goBack, navigate } from '../../navigation/navigationService';
import { Button } from '../../components';

const PRIMARY_GREEN = '#3FA565';
const NAME_MAX_LENGTH = 50;

export default function PersonalDetailsScreen() {
  const [name, setName] = useState('Paschaloiver');
  const [email] = useState('Paschaloiver@example.com');
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.headerButton}>
            <Icon name="chevron-back" size={scale(24)} color={PRIMARY_GREEN} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Personal Details</Text>
          <TouchableOpacity
            style={[styles.headerButton, styles.headerButtonRight]}
            activeOpacity={0.7}
            onPress={() => navigate('EditProfile')}
          >
            <Icon name="pencil" size={scale(22)} color={PRIMARY_GREEN} />
          </TouchableOpacity>
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
            <View style={styles.inputRow}>
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

            <View style={styles.inputRow}>
              <RNTextInput
                style={styles.input}
                value={email}
                placeholder="Email"
                placeholderTextColor={colors.textMuted}
                editable={false}
              />
            </View>

            <View style={styles.inputRow}>
              <RNTextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone"
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Save Button */}
          <Button
            title="Save"
            onPress={() => {}}
            variant="primary"
            style={styles.saveButton}
          />

          {/* Delete Account */}
          <TouchableOpacity
            style={styles.deleteLink}
            activeOpacity={0.7}
            onPress={() => {}}
          >
            <Text style={styles.deleteLinkText}>Delete account permanently</Text>
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerButton: {
    minWidth: scale(40),
  },
  headerButtonRight: {
    alignItems: 'flex-end',
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
    marginBottom: margin.xl,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: padding.lg,
  },
  input: {
    flex: 1,
    fontSize: fontSize(16),
    color: colors.text,
    padding: 0,
  },
  charCount: {
    fontSize: fontSize(14),
    color: colors.textMuted,
    marginLeft: padding.md,
  },
  saveButton: {
    marginBottom: margin.lg,
  },
  deleteLink: {
    alignSelf: 'center',
  },
  deleteLinkText: {
    fontSize: fontSize(14),
    color: PRIMARY_GREEN,
    fontWeight: '500',
  },
});
