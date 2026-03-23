import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate, resetNavigation } from '../../navigation/navigationService';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSize, padding, margin, borderRadius, scale } from '../../utils/responsive';
import { colors } from '../../theme/colors';
import { CommonAppHeader, LogoutModal } from '../../components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { COLORS } from '../../utils/constants';

const LOGOUT_API_URL = 'https://jolloyard-be.myfileshosting.com/api/v1/auth/logout';
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

interface MenuItemProps {
  icon: string;
  text: string;
  onPress?: () => void;
  iconColor?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  text,
  onPress,
  iconColor = '#3FA565',
}) => {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
        <Icon name={icon} size={scale(20)} color={iconColor} />
      </View>
      <Text style={styles.menuItemText}>{text}</Text>
      <Icon name="chevron-forward" size={scale(20)} color="#666" />
    </TouchableOpacity>
  );
};

const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  return <Text style={styles.sectionHeader}>{title}</Text>;
};

export default function PProfile() {
  const [profile, setProfile] = useState<UserProfile>(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

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
          console.log(res, "res");
          if (res.ok) {
            const data = await res.json();

            const user = data?.data?.user ?? data?.user ?? data?.data ?? data;
            if (isActive) setProfile(user ?? null);
          } else {
            const errorData = await res.json();   // read error response
            console.log("API ERROR STATUS:", res.status);
            console.log("API ERROR BODY:", errorData);

            Alert.alert("Error", errorData?.message || "Something went wrong");

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

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        await fetch(LOGOUT_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

      }
    } catch (error) {
      console.log(error, "error");
      // Ignore API errors; we still clear local session
    } finally {
      console.log("lop");

      await AsyncStorage.clear();
      console.log("lopp");
      try {
        await GoogleSignin.signOut();
      } catch {
        // Ignore Google sign-out errors
      }
      console.log("loppp");
      resetNavigation('Welcome');
      console.log("loppppp");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
          <CommonAppHeader />
        {/* User Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {profile?.avatar || profile?.photo || profile?.image ? (
              <Image
                source={{
                  uri:
                    (profile?.avatar as string) ??
                    (profile?.photo as string) ??
                    (profile?.image as string),
                }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Icon name="person-outline" size={scale(28)} color={COLORS.PRIMARY} />
              </View>
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{getDisplayName(profile)}</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigate('ProviderPersonalDetails')}
            >
              <Text style={styles.viewProfileLink}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SHARE AND EARN MONEY! Section */}
        {/* <SectionHeader title="SHARE AND EARN MONEY!" />
        <MenuItem
          icon="gift-outline"
          text="₦ 10 for every friend you bring"
          iconColor="#DC2626"
        /> */}
        <View style={styles.separator} />

        {/* Your Account Section */}
        <SectionHeader title="Your Account" />
        <MenuItem
          icon="person-outline"
          text="Personal detailss"
          onPress={() => navigate('ProviderPersonalDetails')}
        />
        <View style={styles.separator} />
        <MenuItem
          icon="cash-outline"
          text="My Balance"
          onPress={() => navigate('MyBalance')}
        />
        <View style={styles.separator} />
        <MenuItem icon="wallet-outline" text="Booking Preference" />
        <View style={styles.separator} />
        <MenuItem
          icon="lock-closed-outline"
          text="Change password"
          onPress={() => navigate('ChangePassword')}
        />
        <View style={styles.separator} />
        <MenuItem icon="globe-outline" text="Language" />
        <View style={styles.separator} />

        {/* So you want to offer services? Section */}
        <SectionHeader title="So you want to offer services?" />
        <MenuItem icon="swap-horizontal-outline" text="Switch to Client version" />
        <View style={styles.separator} />

        {/* Do you like the app? Section */}
        <SectionHeader title="Do you like the app?" />
        <MenuItem icon="star-outline" text="Will you give us 5 stars?😊" />
        <View style={styles.separator} />
        <MenuItem icon="share-social-outline" text="Share the Jolloyard App" />
        <View style={styles.separator} />

        {/* SUPPORT CENTRE Section */}
        <SectionHeader title="SUPPORT CENTRE" />
        <MenuItem icon="headset-outline" text="Help" />
        <View style={styles.separator} />
        <MenuItem icon="bulb-outline" text="How can we improve?" />
        <View style={styles.separator} />
        <MenuItem icon="help-circle-outline" text="About Jolloyard App" />
        <View style={styles.separator} />
        <MenuItem icon="shield-checkmark-outline" text="Privacy policy" />
        <View style={styles.separator} />
        <MenuItem icon="document-text-outline" text="Terms & Conditions" />
        <View style={styles.separator} />
        <MenuItem
          icon="log-out-outline"
          text="Log out"
          onPress={() => setLogoutModalVisible(true)}
        />
        <View style={styles.separator} />
      </ScrollView>

      <LogoutModal
        visible={logoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        onLogout={handleLogout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.xl,
    paddingVertical: padding.xxl,
    backgroundColor: colors.white,
    marginBottom: margin.md,
  },
  avatarContainer: {
    marginRight: padding.lg,
  },
  avatar: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: colors.borderLight,
  },
  avatarPlaceholder: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: fontSize(20),
    fontWeight: '600',
    color: colors.text,
    marginBottom: padding.xs,
  },
  viewProfileLink: {
    fontSize: fontSize(14),
    color: '#3FA565',
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: fontSize(12),
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    paddingHorizontal: padding.xl,
    paddingTop: padding.lg,
    paddingBottom: padding.sm,
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.xl,
    paddingVertical: padding.lg,
    backgroundColor: colors.white,
  },
  iconContainer: {
    width: scale(36),
    height: scale(36),
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: padding.md,
  },
  menuItemText: {
    flex: 1,
    fontSize: fontSize(16),
    color: colors.text,
    fontWeight: '400',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginLeft: padding.xl,
  },
});