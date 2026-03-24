import React, { useState, useCallback } from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
import { navigate } from '../../navigation/navigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetListingDraft, restoreListingDraft } from '../../store/listingDraftSlice';
import type { ListingDraftState } from '../../store/listingDraftSlice';
import {
  clearListingDraftBackupsFromLocalStorage,
  loadListingDraftBackupsFromLocalStorage,
  type ListingDraftBackup,
} from '../../utils/listingDraftStorage';
import { CommonAppHeader } from '../../components';
import { COLORS } from '../../utils/constants';

const AUTH_TOKEN_KEY = 'auth_accessToken';
const AUTH_USER_KEY = 'auth_user';

export default function PListings() {
  const [checkingVerification, setCheckingVerification] = useState(true);
  const [verificationPending, setVerificationPending] = useState(false);
  const [loadingPublishedListings, setLoadingPublishedListings] = useState(true);
  const [publishedListings, setPublishedListings] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const { activeStep, serviceName } = useAppSelector((s) => s.listingDraft);
  const [savedDrafts, setSavedDrafts] = useState<ListingDraftBackup[]>([]);
  const [loadingSavedDrafts, setLoadingSavedDrafts] = useState(true);

  const stepToProgress = {
    createService: { percent: 0 },
    listingPrice: { percent: 33 },
    listingInformationInterest: { percent: 50 },
    listingGallery: { percent: 60 },
    listingAboutMe: { percent: 75 },
    listingPhone: { percent: 85 },
    listingVerification: { percent: 95 },
  } as const;

  const hasDraft = Boolean(serviceName) && activeStep !== 'createService';

  const inProgressPercent = hasDraft
    ? stepToProgress[activeStep as keyof typeof stepToProgress]?.percent ?? 0
    : 0;

  const inProgressTitle = hasDraft ? serviceName ?? '' : '';
  const inProgressSubtext = !hasDraft
    ? ''
    : activeStep === 'listingVerification'
      ? 'Verification in progress'
      : 'Listing not visible yet';

  const shouldShowEmptyState =
    !loadingPublishedListings &&
    !loadingSavedDrafts &&
    publishedListings.length === 0 &&
    savedDrafts.length === 0 &&
    !hasDraft;

  const handleInProgressPress = () => {
    if (!hasDraft) return;

    switch (activeStep) {
      case 'listingPrice':
        navigate('ListingPrice' as any, { serviceName: serviceName ?? 'handyman' } as any);
        return;
      case 'listingInformationInterest':
        navigate('ListingInformationInterest' as any);
        return;
      case 'listingGallery':
        navigate('ListingGallery' as any);
        return;
      case 'listingAboutMe':
        navigate('ListingAboutMe' as any);
        return;
      case 'listingPhone':
        navigate('ListingPhone' as any);
        return;
      case 'listingVerification':
        navigate('ListingVerification' as any);
        return;
      default:
        navigate('CreateListing' as any);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const checkVerificationStatus = async () => {
        try {
          const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
          const userJson = await AsyncStorage.getItem(AUTH_USER_KEY);
          const user = JSON.parse(userJson ?? '{}');
          const providerId = user?.id;
          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
          };
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }

          const res = await fetch(
            `https://jolloyard-be.myfileshosting.com/api/v1/auth/${providerId}/verification-status`,
            {
              method: 'POST',
              headers,
            },
          );

          const data = await res.json().catch(() => ({}));
          const isVerified = data?.verificationStatus == '1';

          if (!res.ok || !isVerified) {
            setVerificationPending(true);
          } else {
            setVerificationPending(false);
          }
        } catch (err) {
          setVerificationPending(true);
        } finally {
          setCheckingVerification(false);
        }
      };

      const loadPublishedListings = async () => {
        try {
          setLoadingPublishedListings(true);

          const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
          if (!token) {
            setPublishedListings([]);
            return;
          }

          const res = await fetch(
            'https://jolloyard-be.myfileshosting.com/api/v1/providers/listings',
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const data = await res.json().catch(() => ({}));

          // Be tolerant to backend response shape:
          // - array
          // - { data: [...] }
          // - { listings: [...] }
          const listingsFromResponse = Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
              ? data.data
              : Array.isArray(data?.listings)
                ? data.listings
                : [];

          setPublishedListings(listingsFromResponse);
        } catch {
          setPublishedListings([]);
        } finally {
          setLoadingPublishedListings(false);
        }
      };

      const loadSavedDrafts = async () => {
        try {
          setLoadingSavedDrafts(true);
          const drafts = await loadListingDraftBackupsFromLocalStorage();
          const sorted = drafts.sort(
            (a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0),
          );
          setSavedDrafts(sorted);
        } catch {
          setSavedDrafts([]);
        } finally {
          setLoadingSavedDrafts(false);
        }
      };

      checkVerificationStatus();
      loadPublishedListings();
      loadSavedDrafts();
    }, []),
  );

  const navigateForStep = (
    step: ListingDraftState['activeStep'],
    draft: ListingDraftState,
  ) => {
    switch (step) {
      case 'listingPrice':
        navigate('ListingPrice' as any, { serviceName: draft.serviceName ?? 'handyman' } as any);
        return;
      case 'listingInformationInterest':
        navigate('ListingInformationInterest' as any);
        return;
      case 'listingGallery':
        navigate('ListingGallery' as any);
        return;
      case 'listingAboutMe':
        navigate('ListingAboutMe' as any);
        return;
      case 'listingPhone':
        navigate('ListingPhone' as any);
        return;
      case 'listingVerification':
        navigate('ListingVerification' as any);
        return;
      default:
        navigate('CreateListing' as any);
    }
  };

  const handleResumeSavedDraft = (draft: ListingDraftBackup) => {
    dispatch(restoreListingDraft(draft));
    navigateForStep(draft.activeStep, draft);
  };

  const handleAddNewListingPress = async () => {
    // The UI shows: 1 "In progress" card from Redux + N saved drafts from AsyncStorage.
    // If there are multiple items in progress, prompt before clearing them.
    const savedDraftsCount = loadingSavedDrafts ? 0 : savedDrafts.length;
    const inProgressItemsCount = (hasDraft ? 1 : 0) + savedDraftsCount;
    const shouldPrompt = inProgressItemsCount >= 2;

    if (!shouldPrompt) {
      dispatch(resetListingDraft());
      navigate('CreateListing' as any);
      return;
    }

    Alert.alert(
      'Clear in-progress listings?',
      'You have multiple in-progress drafts. Starting a new listing will clear them.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear & start',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoadingSavedDrafts(true);
              dispatch(resetListingDraft());
              await clearListingDraftBackupsFromLocalStorage();
              setSavedDrafts([]);
            } finally {
              setLoadingSavedDrafts(false);
              navigate('CreateListing' as any);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
        <CommonAppHeader />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Listing</Text>
        <View style={styles.headerActions}>
          {/* <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7}>
            <Icon
              name="search-outline"
              size={scale(22)}
              color={colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7}>
            <Icon
              name="notifications-outline"
              size={scale(22)}
              color={colors.text}
            />
          </TouchableOpacity> */}
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Published Section */}
        {shouldShowEmptyState ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrapper}>
              <Icon name="document-text-outline" size={scale(46)} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>No listing</Text>
            <Text style={styles.emptySubtitle}>
              Create your first listing so clients can find you
            </Text>
          </View>
        ) : (
          <>
            {publishedListings.length !== 0 && <Text style={styles.sectionTitle}>Published</Text>}
            {loadingPublishedListings ? (
              <Text style={styles.listingSubtext}>Loading published listings...</Text>
            ) : (
              publishedListings.map((listing) => {
                const title =
                  listing?.serviceName ??
                  listing?.title ??
                  listing?.service?.name ??
                  'Untitled listing';

                const subtext =
                  listing?.status ??
                  listing?.visibility ??
                  listing?.listingStatus ??
                  'Listing visible';

                const tierText =
                  listing?.tier ?? listing?.plan ?? listing?.package ?? 'Bronze';

                const id =
                  listing?.id ??
                  listing?._id ??
                  `${title}-${String(subtext).slice(0, 15)}`;

                return (
                  <TouchableOpacity
                    key={String(id)}
                    style={styles.listingCard}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.listingIcon, { backgroundColor: '#FBCFE8' }]}>
                      <Icon name="shirt-outline" size={scale(24)} color="#EC4899" />
                    </View>
                    <View style={styles.listingContent}>
                      <Text style={styles.listingTitle}>{title}</Text>
                      <Text style={styles.listingSubtext}>{String(subtext)}</Text>
                      <View style={styles.bronzeTag}>
                        <Icon name="medal-outline" size={scale(14)} color="#B45309" />
                        <Text style={styles.bronzeText}>{String(tierText)}</Text>
                      </View>
                    </View>
                    <Icon
                      name="chevron-forward"
                      size={scale(20)}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>
                );
              })
            )}

            {/* In-progress Section (current redux draft) */}
          </>
        )}

        {/* Saved drafts Section */}
       {savedDrafts.length !== 0 && <Text style={[styles.sectionTitle, { marginTop: hasDraft ? margin.sm : margin.xxl }]}>
          In progress
        </Text>}
        {loadingSavedDrafts ? (
          <Text style={styles.listingSubtext}>Loading saved drafts...</Text>
        )  : (
          savedDrafts.map((draft) => {
            const percent =
              stepToProgress[draft.activeStep as keyof typeof stepToProgress]?.percent ?? 0;
            const title = draft.serviceName ?? '';
            const subtext =
              draft.activeStep === 'listingVerification'
                ? 'Verification in progress'
                : 'Listing not visible yet';

            return (
              <TouchableOpacity
                key={draft.draftId}
                style={styles.listingCard}
                activeOpacity={0.7}
                onPress={() => handleResumeSavedDraft(draft)}
              >
                <View style={[styles.listingIcon, { backgroundColor: '#BAE6FD' }]}>
                  <Icon name="water-outline" size={scale(24)} color="#0EA5E9" />
                </View>
                <View style={styles.listingContent}>
                  <Text style={styles.listingTitle}>{title}</Text>
                  <Text style={styles.listingSubtext}>{subtext}</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${percent}%` }]} />
                  </View>
                  <Text style={styles.progressText}>{percent}% Complete</Text>
                  {percent < 100 && (
                    <View style={styles.incompleteTag}>
                      <Text style={styles.incompleteText}>Incomplete</Text>
                    </View>
                  )}
                </View>
                <Icon
                  name="chevron-forward"
                  size={scale(20)}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            );
          })
        )}

        {/* Add New Listing Button */}
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={handleAddNewListingPress}
          disabled={verificationPending}
        >
          <Icon name="add" size={scale(24)} color={colors.primary} />
          <Text style={styles.addButtonText}>Add new listing</Text>
        </TouchableOpacity>

        <View style={{ height: margin.xxl }} />
      </ScrollView>

      {/* Blocking overlay when verification is pending */}
      {verificationPending && (
        <View style={styles.blockOverlay}>
          <SafeAreaView style={styles.blockModalContainer}>
            <View style={styles.blockModalContent}>
              <Icon
                name="shield-checkmark-outline"
                size={scale(56)}
                color={colors.primary}
              />
              <Text style={styles.blockModalTitle}>Verification in progress</Text>
              <Text style={styles.blockModalMessage}>
                Your account verification is still pending. Please wait while we complete the
                process. You cannot use any feature in the app before verification is completed.
              </Text>
              {checkingVerification && (
                <Text style={styles.blockModalMessage}>Checking verification...</Text>
              )}
            </View>
          </SafeAreaView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.xl,
    paddingVertical: padding.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: fontSize(20),
    fontWeight: '700',
    color: COLORS.PRIMARY,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.lg,
  },
  headerIcon: {
    padding: padding.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: padding.xl,
    paddingTop: margin.xl,
  },
  sectionTitle: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: margin.md,
  },
  listingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: padding.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: margin.md,
  },
  listingIcon: {
    width: scale(48),
    height: scale(48),
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: padding.lg,
  },
  listingContent: {
    flex: 1,
  },
  listingTitle: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.text,
  },
  listingSubtext: {
    fontSize: fontSize(13),
    color: colors.textSecondary,
    marginTop: padding.xs,
  },
  bronzeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: padding.sm,
    paddingVertical: padding.xs,
    borderRadius: borderRadius.sm,
    marginTop: margin.sm,
    gap: padding.xs,
  },
  bronzeText: {
    fontSize: fontSize(12),
    fontWeight: '600',
    color: '#166534',
  },
  progressBar: {
    height: scale(6),
    backgroundColor: colors.border,
    borderRadius: borderRadius.round,
    marginTop: padding.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.round,
  },
  progressText: {
    fontSize: fontSize(13),
    fontWeight: '500',
    color: colors.text,
    marginTop: padding.xs,
  },
  incompleteTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FEF08A',
    paddingHorizontal: padding.sm,
    paddingVertical: padding.xs,
    borderRadius: borderRadius.sm,
    marginTop: margin.sm,
  },
  incompleteText: {
    fontSize: fontSize(13),
    fontWeight: '600',
    color: '#854D0E',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
    paddingVertical: padding.lg,
    borderRadius: borderRadius.lg,
    marginTop: margin.xxl,
    gap: padding.sm,
  },
  addButtonText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.primary,
  },
  blockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  },
  blockModalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: padding.xl,
  },
  blockModalContent: {
    alignItems: 'center',
  },
  blockModalTitle: {
    marginTop: padding.lg,
    fontSize: fontSize(20),
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  blockModalMessage: {
    marginTop: padding.md,
    fontSize: fontSize(15),
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emptyState: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: margin.xxxl,
    paddingHorizontal: padding.xl,
  },
  emptyIconWrapper: {
    width: scale(88),
    height: scale(88),
    borderRadius: borderRadius.round,
    backgroundColor: '#E8F5EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: margin.lg,
  },
  emptyTitle: {
    fontSize: fontSize(20),
    fontWeight: '700',
    color: colors.text,
    marginBottom: padding.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: fontSize(14),
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: '85%',
    lineHeight: fontSize(20),
  },
});