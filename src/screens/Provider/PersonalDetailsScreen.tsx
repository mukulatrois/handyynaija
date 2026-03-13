import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput as RNTextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale, fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import { colors } from '../../theme/colors';
import { goBack, navigate } from '../../navigation/navigationService';
import { Button } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ME_API_URL = 'https://jolloyard-be.myfileshosting.com/api/v1/auth/me';
const AUTH_TOKEN_KEY = 'auth_accessToken';
const AUTH_USER_KEY = 'auth_user';

type UserProfile = {
  name?: string;
  full_name?: string;
  fullName?: string;
  first_name?: string;
  lastName?: string;
  last_name?: string;
  email?: string;
  avatar?: string;
  photo?: string;
  image?: string;
} | null;

function getDisplayName(profile: UserProfile): string {
  if (!profile) return 'Guest';
  const n =
    profile.name ??
    profile.full_name ??
    profile.fullName ??
    ([profile.first_name, profile.last_name ?? profile.lastName].filter(Boolean).join(' ') || '');
  return (n && n.trim()) || 'Guest';
}

const PRIMARY_GREEN = '#3FA565';
const NAME_MAX_LENGTH = 50;

export default function PersonalDetailsScreen() {
  const [profile, setProfile] = useState<UserProfile>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadProfile = async () => {
        try {
          const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
          if (!token || !isActive) return;

          const res = await fetch(ME_API_URL, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!isActive) return;

          if (res.ok) {
            const data = await res.json();
            const user = data?.data?.user ?? data?.user ?? data?.data ?? data;
            if (isActive) {
              setProfile(user ?? null);
              const displayName = getDisplayName(user ?? null);
              if (displayName) {
                setName(displayName);
              }
              if (user?.email) {
                setEmail(user.email);
              }
            }
          } else {
            const stored = await AsyncStorage.getItem(AUTH_USER_KEY);
            if (stored && isActive) {
              try {
                const storedUser = JSON.parse(stored);
                setProfile(storedUser);
                const displayName = getDisplayName(storedUser);
                if (displayName) {
                  setName(displayName);
                }
                if (storedUser?.email) {
                  setEmail(storedUser.email);
                }
              } catch {
                // ignore invalid stored user
              }
            }
          }
        } catch {
          const stored = await AsyncStorage.getItem(AUTH_USER_KEY);
          if (stored && isActive) {
            try {
              const storedUser = JSON.parse(stored);
              setProfile(storedUser);
              const displayName = getDisplayName(storedUser);
              if (displayName) {
                setName(displayName);
              }
              if (storedUser?.email) {
                setEmail(storedUser.email);
              }
            } catch {
              // ignore invalid stored user
            }
          }
        }
      };

      loadProfile();

      return () => {
        isActive = false;
      };
    }, []),
  );

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
            onPress={() => setIsEditing((prev) => !prev)}
          >
            <Icon
              name={isEditing ? 'checkmark' : 'pencil'}
              size={scale(22)}
              color={PRIMARY_GREEN}
            />
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
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={name}
                onChangeText={setName}
                placeholder="Name"
                placeholderTextColor={colors.textMuted}
                maxLength={NAME_MAX_LENGTH}
                editable={isEditing}
              />
              <Text style={styles.charCount}>
                {name.length}/{NAME_MAX_LENGTH}
              </Text>
            </View>

            <View style={styles.inputRow}>
              <RNTextInput
                style={[styles.input, styles.inputDisabled]}
                value={email}
                placeholder="Email"
                placeholderTextColor={colors.textMuted}
                editable={false}
              />
            </View>

            <View style={styles.inputRow}>
              <RNTextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone"
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
                editable={isEditing}
              />
            </View>
          </View>

          {/* Save Button */}
          {isEditing && (
            <Button
              title="Save"
              onPress={() => {}}
              variant="primary"
              style={styles.saveButton}
            />
          )}

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
  inputDisabled: {
    color: colors.textMuted,
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
