import React, { useState, useEffect, useRef } from 'react';
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
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomIcon, { IconNames } from '../../../components/Icon';
import { Button } from '../../../components';
import { goBack, resetNavigation } from '../../../navigation/navigationService';
import { scale, fontSize, hp, padding } from '../../../utils/responsive';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
import { COLORS } from '../../../utils/constants';

const MAX_NAME_LENGTH = 50;
const PROFILE_API_URL = 'https://jolloyard-be.myfileshosting.com/api/v1/users/profile';
const DELETE_ACCOUNT_API_URL = 'https://jolloyard-be.myfileshosting.com/api/v1/users/account';
const ME_API_URL = 'https://jolloyard-be.myfileshosting.com/api/v1/auth/me';
const AUTH_TOKEN_KEY = 'auth_accessToken';
const AUTH_USER_KEY = 'auth_user';

const createAvatarPayload = (fileUri: string) => {
  const normalizedUri =
    Platform.OS === 'ios' && fileUri.startsWith('file://')
      ? fileUri.replace('file://', '')
      : fileUri;

  return {
    uri: normalizedUri,
    type: 'image/jpeg',
    name: `avatar-${Date.now()}.jpg`,
  };
};

export default function EditPersonalDetailsScreen() {
  const [name, setName] = useState('Paschaloliver');
  const [email, setEmail] = useState('Paschaloliver@example.com');
  const [phone, setPhone] = useState('');
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
        console.log(res, "res");

        if (res.ok) {
          const data = await res.json();
          const user = data?.data?.user ?? data?.user ?? data?.data ?? data;
          console.log(user, "user");
          if (user) {
            if (user.name || user.full_name || user.fullName) {
              setName(
                user.name ||
                user.full_name ||
                user.fullName,
              );
            }
            if (user.email) {
              setEmail(user.email);
            }
            if (user.phone || user.phone_number) {
              setPhone(user.phone || user.phone_number);
            }
            if (user.profilePicture || user.photo || user.image) {
              setAvatar(user.profilePicture || user.photo || user.image);
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
        Alert.alert('Error', 'Session expired. Please log in again.');
        goBack();
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      const fileToUpload =
        avatarFile ||
        (avatar &&
        (avatar.startsWith('file://') || avatar.startsWith('content://'))
          ? createAvatarPayload(avatar)
          : null);

      if (fileToUpload) {
        // Keep both keys to support whichever field name backend expects.
        formData.append('avatar', fileToUpload as any);
        formData.append('profile_picture', fileToUpload as any);
      }

      const res = await fetch(PROFILE_API_URL, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      console.log(res, 'res');

      if (res.ok) {
        goBack();
      } else {
        let message = 'Something went wrong while saving your details.';
        try {
          const errorData = await res.json();
          message =
            errorData?.message ||
            errorData?.error ||
            errorData?.errors?.[0] ||
            message;
        } catch {
          // keep default message
        }

        Alert.alert('Error', message);
      }
    } catch (error) {
      console.log(error, 'error');
      Alert.alert(
        'Error',
        'Unable to save your details. Please try again.',
      );
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        await fetch(DELETE_ACCOUNT_API_URL, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch {
      // ignore errors
    } finally {
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, AUTH_USER_KEY]);
      resetNavigation('Welcome');
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
          <TouchableOpacity onPress={goBack} style={styles.headerLeft}>
            <CustomIcon name="arrow-back" size={scale(24)} color={COLORS.PRIMARY} />
            <Text style={styles.headerTitle}>Edit Details</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Picture with Camera Overlay */}
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
                    color={COLORS.PRIMARY}
                  />
                </View>
              )}
              <TouchableOpacity
                style={styles.cameraButton}
                activeOpacity={0.7}
                onPress={handleOpenBottomSheet}
              >
                <CustomIcon
                  name="camera"
                  size={scale(20)}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Input Fields */}
          <View style={styles.inputSection}>
            <View style={styles.inputRow}>
              <RNTextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={(text) =>
                  setName(text.slice(0, MAX_NAME_LENGTH))
                }
                maxLength={MAX_NAME_LENGTH}
              />
              <Text style={styles.charCount}>
                {name.length}/{MAX_NAME_LENGTH}
              </Text>
            </View>
            <View style={styles.inputDivider} />

            <View style={styles.inputRow}>
              <RNTextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={false}
              />
            </View>
            <View style={styles.inputDivider} />

            {/* <View style={styles.inputRow}>
              <RNTextInput
                style={styles.input}
                placeholder="Phone"
                placeholderTextColor="#999"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View> */}
          </View>

          {/* Save Button */}
          <View style={styles.buttonSection}>
            <Button title="Save" onPress={handleSave} variant="primary" />
          </View>

          {/* Delete Account Link */}
          <TouchableOpacity
            onPress={handleDeleteAccount}
            style={styles.deleteButton}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteText}>Delete account permanently</Text>
          </TouchableOpacity>

          <View style={{ height: hp(5) }} />
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
            <CustomIcon name="image-outline" size={scale(22)} color={COLORS.PRIMARY} />
            <Text style={styles.sheetRowText}>Select from gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sheetRow}
            onPress={handleOpenCamera}
            activeOpacity={0.7}
          >
            <CustomIcon name="camera-outline" size={scale(22)} color={COLORS.PRIMARY} />
            <Text style={styles.sheetRowText}>Open camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sheetRow}
            onPress={handleCloseBottomSheet}
            activeOpacity={0.7}
          >
            <CustomIcon name="close" size={scale(22)} color="#999" />
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
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.lg,
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    // justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  headerTitle: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#000',
  },
  scrollContent: {
    paddingHorizontal: padding.lg,
    paddingTop: scale(24),
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: scale(32),
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarPlaceholder: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    backgroundColor: '#E8F5EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSection: {
    marginBottom: scale(32),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: fontSize(16),
    color: '#000',
    paddingVertical: scale(14),
  },
  charCount: {
    fontSize: fontSize(14),
    color: '#999',
    marginLeft: scale(8),
  },
  inputDivider: {
    height: 1,
    backgroundColor: '#E8E8E8',
  },
  buttonSection: {
    marginBottom: scale(20),
  },
  deleteButton: {
    alignSelf: 'center',
  },
  deleteText: {
    fontSize: fontSize(14),
    color: COLORS.PRIMARY,
    fontWeight: '500',
  },
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
    color: '#000',
  },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(10),
  },
  sheetRowText: {
    marginLeft: scale(12),
    fontSize: fontSize(15),
    color: '#000',
  },
});
