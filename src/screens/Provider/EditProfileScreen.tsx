import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput as RNTextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale, fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import { colors } from '../../theme/colors';
import { goBack } from '../../navigation/navigationService';
import { Button } from '../../components';
import CustomIcon, { IconNames } from '../../components/Icon';
import RBSheet from 'react-native-raw-bottom-sheet';
import { launchCamera, launchImageLibrary, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker';

const PRIMARY_GREEN = '#3FA565';
const NAME_MAX_LENGTH = 50;
const ABOUT_MAX_LENGTH = 200;
const PROFILE_API_URL = 'https://jolloyard-be.myfileshosting.com/api/v1/users/profile';
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
  phone?: string;
  phone_number?: string;
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

export default function EditProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [about, setAbout] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<any | null>(null);
  const bottomSheetRef = useRef<RBSheet | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        if (!token) return;

        const res = await fetch(ME_API_URL, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          const user = data?.data?.user ?? data?.user ?? data?.data ?? data;

          if (user) {
            setProfile(user);

            const displayName = getDisplayName(user);
            if (displayName) {
              setName(displayName);
            }
            if (user.email) {
              setEmail(user.email);
            }
            if (user.phone || user.phone_number) {
              setPhone(user.phone || user.phone_number);
            }
            if (user.avatar || user.photo || user.image) {
              setAvatar(user.avatar || user.photo || user.image);
            }
          }
        }
      } catch {
        // ignore load errors for now
      }
    };

    loadProfile();
  }, []);

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.open();
  };

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const handlePickFromGallery = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.8,
    };
    const result = await launchImageLibrary(options);
    if (result.didCancel || !result.assets || !result.assets[0]) {
      handleCloseBottomSheet();
      return;
    }
    const asset = result.assets[0];
    setAvatar(asset.uri || null);
    setAvatarFile({
      uri: asset.uri,
      type: asset.type || 'image/jpeg',
      name: asset.fileName || 'avatar.jpg',
    });
    handleCloseBottomSheet();
  };

  const handleOpenCamera = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 0.8,
      saveToPhotos: false,
    };
    const result = await launchCamera(options);
    if (result.didCancel || !result.assets || !result.assets[0]) {
      handleCloseBottomSheet();
      return;
    }
    const asset = result.assets[0];
    setAvatar(asset.uri || null);
    setAvatarFile({
      uri: asset.uri,
      type: asset.type || 'image/jpeg',
      name: asset.fileName || 'avatar.jpg',
    });
    handleCloseBottomSheet();
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        goBack();
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      if (avatarFile) {
        formData.append('avatar', avatarFile as any);
      }

      const res = await fetch(PROFILE_API_URL, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        goBack();
      }
    } catch {
      // ignore errors for now
    }
  };

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
              {avatar ? (
                <Image
                  source={{ uri: avatar }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <CustomIcon
                    name={IconNames.person}
                    size={scale(40)}
                    color={PRIMARY_GREEN}
                  />
                </View>
              )}
              <TouchableOpacity
                style={styles.cameraButton}
                activeOpacity={0.7}
                onPress={handleOpenBottomSheet}
              >
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
            onPress={handleSave}
            variant="primary"
            style={styles.saveButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <RBSheet
        ref={bottomSheetRef}
        height={scale(220)}
        openDuration={250}
        closeOnDragDown
        closeOnPressMask
        customStyles={{
          container: styles.sheetContainer,
          draggableIcon: styles.sheetDragIcon,
        }}
      >
        <View style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>Profile photo</Text>
          <TouchableOpacity
            style={styles.sheetRow}
            onPress={handlePickFromGallery}
            activeOpacity={0.7}
          >
            <CustomIcon name={IconNames.image} size={scale(22)} color={PRIMARY_GREEN} />
            <Text style={styles.sheetRowText}>Select from gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sheetRow}
            onPress={handleOpenCamera}
            activeOpacity={0.7}
          >
            <CustomIcon name={IconNames.camera} size={scale(22)} color={PRIMARY_GREEN} />
            <Text style={styles.sheetRowText}>Open camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sheetRow}
            onPress={handleCloseBottomSheet}
            activeOpacity={0.7}
          >
            <CustomIcon name={IconNames.close} size={scale(22)} color="#999" />
            <Text style={styles.sheetRowText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
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
  sheetContainer: {
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    paddingHorizontal: padding.lg,
    paddingBottom: padding.lg,
  },
  sheetDragIcon: {
    backgroundColor: '#CCC',
  },
  sheetContent: {
    marginTop: scale(8),
  },
  sheetTitle: {
    fontSize: fontSize(16),
    fontWeight: '600',
    marginBottom: scale(16),
    color: colors.text,
  },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(10),
  },
  sheetRowText: {
    marginLeft: scale(12),
    fontSize: fontSize(15),
    color: colors.text,
  },
  avatarPlaceholder: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    backgroundColor: '#E8F5EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
