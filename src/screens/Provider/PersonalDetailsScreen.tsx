



import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomIcon, { IconNames } from '../../components/Icon';
import { goBack, navigate } from '../../navigation/navigationService';
import { scale, fontSize, wp, hp, padding } from '../../utils/responsive';
import { COLORS } from '../../utils/constants';

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

const RATING_CATEGORIES = [
  { label: 'Service', value: 4.8 },
  { label: 'Communication', value: 5 },
  { label: 'Kindness', value: 5 },
  { label: 'Booked Time', value: 5 },
  { label: 'Comport', value: 5 },
];

const SAMPLE_COMMENTS = [
  {
    id: '1',
    name: 'Esther',
    avatar: 'https://i.pravatar.cc/100?img=5',
    timeAgo: '3 day ago',
    text: 'He is very polite and compostable.',
    rating: 5,
    verified: true,
  },
  {
    id: '2',
    name: 'Esther',
    avatar: 'https://i.pravatar.cc/100?img=5',
    timeAgo: '3 day ago',
    text: 'He is very polite and compostable.',
    rating: 5,
    verified: true,
  },
  {
    id: '3',
    name: 'Esther',
    avatar: 'https://i.pravatar.cc/100?img=5',
    timeAgo: '3 day ago',
    text: 'He is very polite and compostable.',
    rating: 5,
    verified: true,
  },
  {
    id: '4',
    name: 'Esther',
    avatar: 'https://i.pravatar.cc/100?img=5',
    timeAgo: '3 day ago',
    text: 'He is very polite and compostable.',
    rating: 5,
    verified: true,
  },
];

function RatingBar({ value }: { value: number }) {
  const fillPercent = (value / 5) * 100;
  return (
    <View style={styles.ratingBarTrack}>
      <View style={[styles.ratingBarFill, { width: `${fillPercent}%` }]} />
    </View>
  );
}

export default function PersonalDetailsScreen() {

  const [profile, setProfile] = useState<UserProfile>(null);

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
            if (isActive) setProfile(user ?? null);
          } else {
            const stored = await AsyncStorage.getItem(AUTH_USER_KEY);
            if (stored && isActive) {
              try {
                setProfile(JSON.parse(stored));
              } catch {
                // ignore invalid stored user
              }
            }
          }
        } catch {
          const stored = await AsyncStorage.getItem(AUTH_USER_KEY);
          if (stored && isActive) {
            try {
              setProfile(JSON.parse(stored));
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
      {/* Header - back arrow GREEN, title black bold */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.headerLeft}>
          <CustomIcon name="arrow-back" size={scale(24)} color={COLORS.PRIMARY} />
          <Text style={styles.headerTitle}>Personal Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('EditPersonalDetails')}
          activeOpacity={0.7}
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Summary */}
        <View style={styles.profileSummary}>
          {profile?.avatar || profile?.photo || profile?.image ? (
            <Image
              source={{
                uri: (profile?.avatar as string) ?? (profile?.photo as string) ?? (profile?.image as string),
              }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <CustomIcon name={IconNames.person} size={scale(32)} color={COLORS.PRIMARY} />
            </View>
          )}
          <Text style={styles.name}>{getDisplayName(profile)}</Text>
          <View style={styles.statsRow}>
            <TouchableOpacity style={styles.statItem}>
              <View style={styles.statMain}>
                <FontAwesome name="star" size={scale(16)} color="#FFA500" />
                <Text style={styles.statValue}>5</Text>
              </View>
              <Text style={[styles.statLabel, styles.statLabelReviews]}>13 reviews</Text>
            </TouchableOpacity>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>19</Text>
              <Text style={styles.statLabel}>Services</Text>
            </View>
          </View>
        </View>
        <View style={styles.profileDivider} />

        {/* Overall Rating - 5 + star, Outstanding, (13 ratings) below */}
        <View style={styles.ratingsSection}>
          <View style={styles.ratingsHeader}>
            <View style={styles.ratingMainRow}>
              <FontAwesome name="star" size={scale(18)} color="#FFA500" />
              <Text style={styles.outstandingText}>5 Outstanding</Text>
            </View>
            <Text style={styles.ratingsCount}>(13 ratings)</Text>
          </View>
          {RATING_CATEGORIES.map((item) => (
            <View key={item.label} style={styles.ratingRow}>
              <Text style={styles.ratingLabel}>{item.label}</Text>
              <RatingBar value={item.value} />
              <Text style={styles.ratingValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Comments - list with dividers, grey checkmark, star on far right */}
        <Text style={styles.commentsHeader}>Comments</Text>
        <View style={styles.commentsList}>
          {SAMPLE_COMMENTS.map((comment, index) => (
            <View key={comment.id}>
              <View style={styles.commentRow}>
                <Image
                  source={{ uri: comment.avatar }}
                  style={styles.commentAvatar}
                />
                <View style={styles.commentMeta}>
                  <View style={styles.commentNameRow}>
                    <Text style={styles.commentName}>{comment.name}</Text>
                    <CustomIcon
                      name="time-outline"
                      size={scale(14)}
                      color="#999"
                    />
                    <Text style={styles.commentTime}>{comment.timeAgo}</Text>
                  </View>
                  {comment.verified && (
                    <View style={styles.verifiedBadge}>
                      <CustomIcon
                        name="checkmark-circle-outline"
                        size={scale(14)}
                        color="#999"
                      />
                      <Text style={styles.verifiedText}>Verified service</Text>
                    </View>
                  )}
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
                <View style={styles.commentRatingRight}>
                  <FontAwesome name="star" size={scale(12)} color="#FFA500" />
                  <Text style={styles.commentRatingValue}>{comment.rating}</Text>
                </View>
              </View>
              {index < SAMPLE_COMMENTS.length - 1 && (
                <View style={styles.commentDivider} />
              )}
            </View>
          ))}
        </View>

        <View style={{ height: hp(5) }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.lg,
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
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
  editText: {
    fontSize: fontSize(16),
    fontWeight: '500',
    color: '#3FA565',
  },
  scrollContent: {
    paddingHorizontal: padding.lg,
    paddingTop: padding.lg,
  },
  profileSummary: {
    alignItems: 'center',
    marginBottom: scale(16),
  },
  avatarPlaceholder: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    marginBottom: scale(12),
    backgroundColor: '#E8F5EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    marginBottom: scale(12),
  },
  name: {
    fontSize: fontSize(20),
    fontWeight: '600',
    color: '#000',
    marginBottom: scale(12),
  },
  statsRow: {
    flexDirection: 'row',
    gap: scale(40),
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  statValue: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#000',
  },
  statLabel: {
    fontSize: fontSize(12),
    color: '#666',
    marginTop: scale(2),
  },
  statLabelReviews: {
    textDecorationLine: 'underline',
    color: '#000',
  },
  profileDivider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginBottom: scale(20),
  },
  ratingsSection: {
    marginBottom: scale(24),
  },
  ratingsHeader: {
    marginBottom: scale(14),
  },
  ratingMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  outstandingText: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#000',
  },
  ratingsCount: {
    fontSize: fontSize(12),
    color: '#999',
    marginTop: scale(4),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
    gap: scale(12),
  },
  ratingLabel: {
    flex: 0,
    width: wp(22),
    fontSize: fontSize(14),
    color: '#333',
  },
  ratingBarTrack: {
    flex: 1,
    height: scale(8),
    backgroundColor: '#E8E8E8',
    borderRadius: scale(4),
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#FFA500',
    borderRadius: scale(4),
  },
  ratingValue: {
    width: scale(32),
    fontSize: fontSize(14),
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },
  commentsHeader: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#3FA565',
    marginBottom: scale(12),
  },
  commentsList: {
    backgroundColor: '#fff',
    borderRadius: 0,
  },
  commentRow: {
    flexDirection: 'row',
    paddingVertical: scale(14),
  },
  commentAvatar: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
  },
  commentMeta: {
    marginLeft: scale(12),
    flex: 1,
  },
  commentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginBottom: scale(4),
  },
  commentName: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: '#000',
  },
  commentTime: {
    fontSize: fontSize(12),
    color: '#999',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginBottom: scale(6),
  },
  verifiedText: {
    fontSize: fontSize(12),
    color: '#999',
  },
  commentText: {
    fontSize: fontSize(14),
    color: '#000',
    lineHeight: scale(20),
  },
  commentRatingRight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(4),
  },
  commentRatingValue: {
    fontSize: fontSize(12),
    fontWeight: '600',
    color: '#333',
  },
  commentDivider: {
    height: 1,
    backgroundColor: '#E8E8E8',
  },
});

