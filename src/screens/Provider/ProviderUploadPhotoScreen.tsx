import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImageCropPicker from 'react-native-image-crop-picker';
import { goBack, navigate } from '../../navigation/navigationService';
import { Button } from '../../components';
import { scale, fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import { setProviderPhotoSelected } from '../../providerRegister/providerRegisterStore';

const PRIMARY_GREEN = '#3FA565';
const CROP_SIZE = 400;

export default function ProviderUploadPhotoScreen() {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const refPhotoSheet = useRef<any>(null);

  const openPhotoSheet = () => {
    setTimeout(() => refPhotoSheet.current?.open(), 0);
  };
  const closePhotoSheet = () => refPhotoSheet.current?.close();

  const requestGalleryPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;
    const apiLevel = Platform.Version as number;
    const permission =
      apiLevel >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    try {
      const result = await PermissionsAndroid.request(permission, {
        title: 'Photo access',
        message: 'HandyNaija needs access to your photos to set a profile picture.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      return result === PermissionsAndroid.RESULTS.GRANTED;
    } catch {
      return false;
    }
  };

  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera access',
          message: 'HandyNaija needs camera access to take a profile picture.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return result === PermissionsAndroid.RESULTS.GRANTED;
    } catch {
      return false;
    }
  };

  const onImageSelected = (path: string) => {
    setPhotoUri(path);
    setHasPhoto(true);
    setProviderPhotoSelected(true);
  };

  const openGallery = () => {
    ImageCropPicker.openPicker({
      cropping: true,
      width: CROP_SIZE,
      height: CROP_SIZE,
      cropperCircleOverlay: true,
    })
      .then((image) => onImageSelected(image.path))
      .catch((err) => {
        if (err?.code !== 'E_PICKER_CANCELLED') {
          Alert.alert('Error', err?.message ?? 'Something went wrong');
        }
      });
  };

  const openCamera = () => {
    ImageCropPicker.openCamera({
      cropping: true,
      width: CROP_SIZE,
      height: CROP_SIZE,
      cropperCircleOverlay: true,
    })
      .then((image) => onImageSelected(image.path))
      .catch((err) => {
        if (err?.code !== 'E_PICKER_CANCELLED') {
          Alert.alert('Error', err?.message ?? 'Something went wrong');
        }
      });
  };

  const handleSelectImage = async () => {
    closePhotoSheet();
    const granted = await requestGalleryPermission();
    if (!granted) {
      Alert.alert(
        'Permission required',
        'Photo access is needed to choose a profile picture. Please enable it in Settings.',
      );
      return;
    }
    openGallery();
  };

  const handleOpenCamera = async () => {
    closePhotoSheet();
    const granted = await requestCameraPermission();
    if (!granted) {
      Alert.alert(
        'Permission required',
        'Camera access is needed to take a profile picture. Please enable it in Settings.',
      );
      return;
    }
    openCamera();
  };

  const handleSelectPhoto = () => openPhotoSheet();

  const handleContinue = () => {
    if (!hasPhoto) return;
    navigate('ProviderAddAddress');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>

      {/* Header with back arrow and progress bar */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={scale(22)} color={PRIMARY_GREEN} />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '51%' }]} />
        </View>
      </View>

      {/* Title, subtitle & photo circle - outside ScrollView so tap works */}
      <View style={styles.photoSection}>
        <Text style={styles.title}>Profile Picture</Text>
        <Text style={styles.subtitle}>
          This will be the picture that clients will see of you. Try to make it as trustworthy as
          possible.
        </Text>

        <TouchableOpacity
          style={[styles.photoCircle, hasPhoto && styles.photoCircleSelected]}
          onPress={handleSelectPhoto}
          activeOpacity={0.8}
        >
          {hasPhoto ? (
            <Image
              source={
                photoUri
                  ? { uri: photoUri }
                  : require('../../Images/logo.png')
              }
              style={styles.photoImage}
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="add" size={scale(28)} color={PRIMARY_GREEN} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Guidance card */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>What makes a good profile picture?</Text>

          <View style={styles.examplesRow}>
            <View style={styles.exampleItem}>
              <View style={styles.exampleAvatarGood}>
                <Ionicons name="person-outline" size={scale(32)} color="#fff" />
              </View>
              <Ionicons
                name="checkmark-circle"
                size={scale(20)}
                color={PRIMARY_GREEN}
                style={styles.exampleBadge}
              />
            </View>

            <View style={styles.exampleItem}>
              <View style={styles.exampleAvatarBad}>
                <Ionicons name="person-outline" size={scale(32)} color="#fff" />
              </View>
              <Ionicons
                name="close-circle"
                size={scale(20)}
                color="#EF4444"
                style={styles.exampleBadge}
              />
            </View>
          </View>

          <View style={styles.tipRow}>
            <Ionicons name="checkmark-circle" size={scale(18)} color={PRIMARY_GREEN} />
            <Text style={styles.tipText}>Good lighting</Text>
          </View>
          <View style={styles.tipRow}>
            <Ionicons name="checkmark-circle" size={scale(18)} color={PRIMARY_GREEN} />
            <Text style={styles.tipText}>Good resolution</Text>
          </View>
          <View style={styles.tipRow}>
            <Ionicons name="checkmark-circle" size={scale(18)} color={PRIMARY_GREEN} />
            <Text style={styles.tipText}>Visible face</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom continue button */}
      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          style={styles.continueButton}
          disabled={!hasPhoto}
        />
      </View>

      {/* Photo source bottom sheet */}
      <RBSheet
        ref={refPhotoSheet}
        height={scale(220)}
        openDuration={250}
        closeOnPressMask
        customStyles={{
          container: styles.photoSheet,
        }}
      >
        <View style={styles.photoSheetHandle} />
        <TouchableOpacity
          style={styles.photoSheetOption}
          onPress={handleSelectImage}
          activeOpacity={0.7}
        >
          <Ionicons name="images-outline" size={scale(22)} color={PRIMARY_GREEN} />
          <Text style={styles.photoSheetOptionText}>Select image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.photoSheetOption}
          onPress={handleOpenCamera}
          activeOpacity={0.7}
        >
          <Ionicons name="camera-outline" size={scale(22)} color={PRIMARY_GREEN} />
          <Text style={styles.photoSheetOptionText}>Open camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.photoSheetOption, styles.photoSheetOptionCancel]}
          onPress={closePhotoSheet}
          activeOpacity={0.7}
        >
          <Text style={styles.photoSheetCancelText}>Cancel</Text>
        </TouchableOpacity>
      </RBSheet>
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
    paddingHorizontal: padding.xl,
    paddingVertical: padding.lg,
    paddingBottom: padding.md,
    gap: padding.md,
  },
  backButton: {
    padding: padding.xs,
  },
  progressBar: {
    flex: 1,
    height: scale(6),
    backgroundColor: '#E0E0E0',
    borderRadius: scale(10),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3FA565',
    borderRadius: scale(10),
  },
  photoSection: {
    paddingHorizontal: padding.xl,
  },
  title: {
    fontSize: fontSize(22),
    fontWeight: '700',
    color: '#000',
    marginBottom: margin.xs,
  },
  subtitle: {
    fontSize: fontSize(14),
    color: '#555',
    lineHeight: fontSize(20),
    marginBottom: margin.xl,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: margin.lg,
    paddingBottom: margin.xxxl,
  },
  photoCircle: {
    width: scale(160),
    height: scale(160),
    borderRadius: scale(80),
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D4D4D4',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: margin.xl,
  },
  photoCircleSelected: {
    backgroundColor: '#E5F5EC',
    borderColor: PRIMARY_GREEN,
  },
  photoImage: {
    width: '80%',
    height: '80%',
    borderRadius: borderRadius.round,
  },
  tipsCard: {
    marginHorizontal: padding.xl,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    padding: padding.lg,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  tipsTitle: {
    fontSize: fontSize(15),
    fontWeight: '600',
    color: '#000',
    marginBottom: margin.md,
  },
  examplesRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: margin.md,
  },
  exampleItem: {
    alignItems: 'center',
  },
  exampleAvatarGood: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: PRIMARY_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exampleAvatarBad: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exampleBadge: {
    marginTop: margin.xs,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: margin.sm,
    gap: padding.sm,
  },
  tipText: {
    fontSize: fontSize(14),
    color: '#111827',
  },
  footer: {
    paddingHorizontal: padding.xl,
    paddingBottom: margin.xl,
    paddingTop: padding.sm,
  },
  continueButton: {},
  photoSheet: {
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingHorizontal: padding.xl,
    paddingBottom: padding.xl,
  },
  photoSheetHandle: {
    width: scale(40),
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D4D4D4',
    alignSelf: 'center',
    marginBottom: margin.lg,
  },
  photoSheetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.md,
    paddingVertical: padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  photoSheetOptionText: {
    fontSize: fontSize(16),
    color: '#111827',
    fontWeight: '500',
  },
  photoSheetOptionCancel: {
    borderBottomWidth: 0,
    justifyContent: 'center',
    marginTop: margin.sm,
  },
  photoSheetCancelText: {
    fontSize: fontSize(16),
    color: '#6B7280',
    fontWeight: '500',
  },
});

