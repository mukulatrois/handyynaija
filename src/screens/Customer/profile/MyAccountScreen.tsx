import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsRow, ShareAppModal, RateAppModal, LogoutModal } from '../../../components';
import { navigate } from '../../../navigation/navigationService';

export default function MyAccountScreen() {
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [rateModalVisible, setRateModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

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

  const handleLogout = () => {
    setLogoutModalVisible(false);
    // TODO: Implement actual logout
    Alert.alert('Logged out', 'You have been logged out.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* Profile */}
        <View style={styles.profile}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Paschaloliver</Text>
            <TouchableOpacity onPress={goToPersonalDetails} activeOpacity={0.7}>
              <Text style={styles.profileLink}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Share */}
        <Text style={styles.sectionTitle}>SHARE AND EARN MONEY!</Text>
        <SettingsRow
          title="₦10 for every friend you bring"
          icon="gift-outline"
          onPress={goToShareAndEarn}
        />

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
