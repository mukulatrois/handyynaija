import React, { useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
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
  setGalleryImages,
  type GalleryImage,
  resetListingDraft,
} from '../../store/listingDraftSlice';
import { saveListingDraftBackupToLocalStorage } from '../../utils/listingDraftStorage';

const PRIMARY_GREEN = '#3FA565';

const goodGalleryItems = [
  { id: '1', text: 'Photos of previous work', good: true },
  { id: '2', text: 'Services you provide', good: true },
  { id: '3', text: 'Good resolution', good: true },
  { id: '4', text: 'Contact Details', good: false },
];

export default function ListingGalleryScreen() {
  const MAX_IMAGES = 5;
  const dispatch = useAppDispatch();
  const draft = useAppSelector((s) => s.listingDraft);

  const galleryImages = draft.galleryImages ?? [];

  useEffect(() => {
    dispatch(setActiveStep('listingGallery'));
  }, [dispatch]);

  const canAddMore = useMemo(
    () => galleryImages.length < MAX_IMAGES,
    [galleryImages.length]
  );

  const canContinue = useMemo(() => galleryImages.length > 0, [galleryImages.length]);

  const requestGalleryPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;

    const apiLevel = (Platform.Version as number) || 0;
    const permission =
      apiLevel >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    try {
      const result = await PermissionsAndroid.request(permission, {
        title: 'Photo access',
        message: 'HandyNaija needs access to your photos to add gallery images.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      return result === PermissionsAndroid.RESULTS.GRANTED;
    } catch {
      return false;
    }
  }, []);

  const handlePickImagesFromLibrary = useCallback(async () => {
    if (!canAddMore) return;

    const granted = await requestGalleryPermission();
    if (!granted) {
      Alert.alert(
        'Permission required',
        'Photo access is needed to choose gallery images. Please enable it in Settings.'
      );
      return;
    }

    const remaining = Math.max(1, MAX_IMAGES - galleryImages.length);
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: remaining,
      quality: 0.8,
    };

    const result = await launchImageLibrary(options);
    if (result.didCancel || !result.assets || result.assets.length === 0) return;

    const picked: GalleryImage[] = result.assets
      .map((a) => ({
        uri: a.uri ?? '',
        type: a.type,
        fileName: a.fileName,
      }))
      .filter((img) => !!img.uri);

    if (!picked.length) return;
    dispatch(setGalleryImages([...galleryImages, ...picked].slice(0, MAX_IMAGES)));
  }, [
    MAX_IMAGES,
    canAddMore,
    dispatch,
    galleryImages,
    requestGalleryPermission,
  ]);

  const handleOpenCamera = useCallback(async () => {
    if (!canAddMore) return;

    // Note: permissions are typically handled automatically by the native module,
    // but we keep this flow simple for now.
    const remaining = Math.max(1, MAX_IMAGES - galleryImages.length);
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 0.8,
      saveToPhotos: false,
    };

    const result = await launchCamera(options);
    if (result.didCancel || !result.assets || !result.assets[0]) return;

    const asset = result.assets[0];
    const uri = asset.uri ?? '';
    if (!uri) return;

    // Camera flow is single image.
    dispatch(
      setGalleryImages(
        [...galleryImages, { uri, type: asset.type, fileName: asset.fileName }].slice(
          0,
          MAX_IMAGES
        )
      )
    );
  }, [MAX_IMAGES, canAddMore, dispatch, galleryImages]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '48%' }]} />
        </View>

        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.headerButton}>
            <Icon name="chevron-back" size={scale(24)} color={PRIMARY_GREEN} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              dispatch(setActiveStep('listingGallery'));
              await saveListingDraftBackupToLocalStorage({
                ...draft,
                activeStep: 'listingGallery',
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
          <Text style={styles.title}>Gallery</Text>
          <Text style={styles.helperText}>Add service related photos as portfolio to do your listing</Text>
          <Text style={styles.limitText}>You can add up to {MAX_IMAGES} images.</Text>

          <View style={styles.galleryRowWrap}>
            {galleryImages.map((img, index) => (
              <View key={`${img.uri}-${index}`} style={styles.photoCard}>
                <Image source={{ uri: img.uri }} style={styles.photoImage} resizeMode="cover" />
              </View>
            ))}

            {canAddMore && (
              <TouchableOpacity
                style={styles.addMoreCard}
                activeOpacity={0.8}
                onPress={() =>
                  Alert.alert('Add image', 'Choose source', [
                    { text: 'Gallery', onPress: handlePickImagesFromLibrary },
                    { text: 'Camera', onPress: handleOpenCamera },
                    { text: 'Cancel', style: 'cancel' },
                  ])
                }
              >
                <Icon name="add" size={scale(22)} color={colors.textSecondary} />
                <Text style={styles.addMoreText}>Add image</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.guideCard}>
            <Text style={styles.guideTitle}>What's makes a good gallery?</Text>
            {goodGalleryItems.map((item) => (
              <View key={item.id} style={styles.guideRow}>
                <Icon
                  name={item.good ? 'checkmark' : 'close'}
                  size={scale(16)}
                  color={item.good ? PRIMARY_GREEN : colors.textSecondary}
                />
                <Text style={styles.guideText}>{item.text}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomButtonWrap}>
          <Button
            title="Continue"
            onPress={() => {
              dispatch(setActiveStep('listingAboutMe'));
              navigate('ListingAboutMe');
            }}
            variant="primary"
            disabled={!canContinue}
            style={!canContinue ? styles.continueButtonDisabled : undefined}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
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
    backgroundColor: colors.white,
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
    fontSize: fontSize(15),
    fontWeight: '500',
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
    fontSize: fontSize(12),
    color: colors.textSecondary,
    marginBottom: margin.lg,
  },
  limitText: {
    fontSize: fontSize(12),
    color: colors.textMuted ?? colors.textSecondary,
    marginBottom: margin.lg,
  },
  galleryRowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.md,
    marginBottom: margin.xl,
    flexWrap: 'wrap',
  },
  photoCard: {
    width: scale(92),
    height: scale(92),
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  addMoreCard: {
    width: scale(92),
    height: scale(92),
    borderRadius: borderRadius.lg,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    gap: padding.xs,
  },
  addMoreText: {
    fontSize: fontSize(13),
    color: colors.text,
  },
  guideCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    padding: padding.lg,
  },
  guideTitle: {
    fontSize: fontSize(16),
    color: colors.text,
    fontWeight: '500',
    marginBottom: padding.md,
  },
  guideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
    marginBottom: padding.xs,
  },
  guideText: {
    fontSize: fontSize(13),
    color: colors.textSecondary,
  },
  bottomButtonWrap: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: padding.xl,
    paddingVertical: padding.lg,
    backgroundColor: colors.white,
  },
  continueButtonDisabled: {
    opacity: 0.55,
  },
});
