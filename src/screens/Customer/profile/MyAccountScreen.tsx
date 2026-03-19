import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingsRow, ShareAppModal, RateAppModal, LogoutModal, Icon, IconNames } from '../../../components';
import { navigate, replace, resetNavigation } from '../../../navigation/navigationService';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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

 const  MyAccountScreen=(props) =>{
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [rateModalVisible, setRateModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
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
            console.log(user, "user");
            console.log(token, "access token");
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

  const goToPersonalDetails = () => navigate('PersonalDetails');
  const goToShareAndEarn = () => navigate('ShareAndEarn');
  const goToMyCodes = () => navigate('MyCodes');
  const goToMyBookings = () => navigate('MyBookings');
  const goToMyAddresses = () => navigate('MyAddresses');
  const goToPaymentsAndRefunds = () => navigate('PaymentsAndRefunds');
  const goToChooseLanguage = () => navigate('ChooseLanguage');
  const goToHelp = () => navigate('Help');
  const goToAboutHandynaija = () => navigate('AboutHandynaija');
  const goToHowCanWeImprove = () => navigate('HowCanWeImprove');

  const handleShareApp = async () => {
    setShareModalVisible(false);
    try {
      await Share.share({
        message: 'Check out HandyNaija App!',
        url: 'https://handynaija.com',
        title: 'HandyNaija App',
      });
    } catch {
      // User cancelled or share failed
    }
  };

  const handleRateSubmit = (rating: number) => {
    setRateModalVisible(false);
    Alert.alert('Thank you!', `You rated us ${rating} stars.`);
  };

  const handleLogout = async () => {
    setLogoutModalVisible(false);
    console.log("ko");

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
    } catch {
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* Profile */}
        <View style={styles.profile}>
          {profile?.profilePicture ? (
            <Image
              source={{
                // uri: https://jolloyard-be.myfileshosting.com/api/v1/${profile?.profilePicture}
                uri: profile?.profilePicture,
              }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Icon name={IconNames.person} size={32} color="#3FA565" />
            </View>
          )}
          <View>
            <Text style={styles.name}>{getDisplayName(profile)}</Text>
            <TouchableOpacity onPress={goToPersonalDetails} activeOpacity={0.7}>
              <Text style={styles.profileLink}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Share */}
        {/* <Text style={styles.sectionTitle}>SHARE AND EARN MONEY!</Text> */}
        {/* <SettingsRow
          title="₦10 for every friend you bring"
          icon="gift-outline"
          onPress={goToShareAndEarn}
        /> */}

        {/* Account Settings */}
        <Text style={styles.sectionTitle}>ACCOUNT SETTINGS</Text>
        <SettingsRow title="Personal details" icon="person-outline" onPress={goToPersonalDetails} />
        <SettingsRow title="My Bookings" icon="calendar-outline" onPress={goToMyBookings} />
        <SettingsRow
          title="My addresses"
          icon="location-outline"
          onPress={goToMyAddresses}
        />
        <SettingsRow
          title="Payment and refunds"
          icon="card-outline"
          onPress={goToPaymentsAndRefunds}
        />
        <SettingsRow title="Change password" icon="lock-closed-outline" />
        <SettingsRow
          title="Language"
          icon="globe-outline"
          onPress={goToChooseLanguage}
        />

        {/* Codes and Promotions */}
        <Text style={styles.sectionTitle}>Codes and Promotions</Text>
        <SettingsRow
          title="My coupon codes"
          icon="pricetag-outline"
          onPress={goToMyCodes}
        />

        {/* Switch */}
        <Text style={styles.sectionTitle}>
          So you want to offer services?
        </Text>
        <SettingsRow title="Switch to professional version" icon="swap-horizontal-outline" />

        {/* Like app */}
        <Text style={styles.sectionTitle}>Do you like the app?</Text>
        <SettingsRow
          title="Will you give us 5 stars? 😊"
          icon="star-outline"
          onPress={() => setRateModalVisible(true)}
        />
        <SettingsRow
          title="Share the HandyNaija App"
          icon="share-social-outline"
          onPress={() => setShareModalVisible(true)}
        />

        {/* Support */}
        <Text style={styles.sectionTitle}>SUPPORT CENTER</Text>
        <SettingsRow
          title="Help"
          icon="headset-outline"
          onPress={goToHelp}
        />
        <SettingsRow
          title="How can we improve?"
          icon="bulb-outline"
          onPress={goToHowCanWeImprove}
        />
        <SettingsRow
          title="About HandyNaija App"
          icon="help-circle-outline"
          onPress={goToAboutHandynaija}
        />
        <SettingsRow
          title="Log out"
          icon="log-out-outline"
          onPress={() => setLogoutModalVisible(true)}
        />

        <View style={{ height: 40 }} />
      </ScrollView>

      <ShareAppModal
        visible={shareModalVisible}
        onCancel={() => setShareModalVisible(false)}
        onShare={handleShareApp}
      />
      <RateAppModal
        visible={rateModalVisible}
        onCancel={() => setRateModalVisible(false)}
        onSubmit={handleRateSubmit}
      />
      <LogoutModal
        visible={logoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        onLogout={handleLogout}
      />
    </SafeAreaView>
  );
}


export default MyAccountScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },

  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: '#E8F5EC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
  },

  profileLink: {
    color: '#3FA565',
    marginTop: 4,
  },

  sectionTitle: {
    marginTop: 20,
    marginBottom: 6,
    marginHorizontal: 16,
    fontSize: 12,
    color: '#777',
    fontWeight: '600',
  },
});
