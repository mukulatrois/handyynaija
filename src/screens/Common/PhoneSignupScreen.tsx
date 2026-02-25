import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { navigate, goBack } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import { Button, TextInput as CustomTextInput, FooterLink } from '../../components';
import CustomIcon, { IconNames } from '../../components/Icon';

export default function PhoneSignupScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+234');

  const handleContinue = () => {
    if (phoneNumber.length >= 10) {
      navigate('OTP', { phoneNumber: `${countryCode}${phoneNumber}`, type: 'phone' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <CustomIcon name={IconNames.arrowBack} size={fontSize(20)} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Phone Signup</Text>
        <Text style={styles.subtitle}>Enter your phone number to create an account</Text>

        <View style={styles.phoneContainer}>
          <TouchableOpacity style={styles.countryCodeContainer}>
            <Text style={styles.countryCode}>{countryCode}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
          <View style={styles.phoneInputContainer}>
            <CustomTextInput
              placeholder="Enter phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              containerStyle={{ marginBottom: 0 }}
            />
          </View>
        </View>

        <Button
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          disabled={phoneNumber.length < 10}
          style={{ marginTop: margin.xl }}
        />

        <FooterLink
          text="Already have an account?"
          linkText="Sign In"
          onPress={() => navigate('Login')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: padding.xl,
    paddingTop: scale(40),
  },
  backButton: {
    marginBottom: margin.lg,
  },
  backIcon: {
    fontSize: fontSize(24),
    color: '#000',
  },
  title: {
    fontSize: fontSize(28),
    fontWeight: 'bold',
    color: '#18375F',
    textAlign: 'center',
    marginBottom: padding.sm,
  },
  subtitle: {
    fontSize: fontSize(16),
    color: '#666',
    textAlign: 'center',
    marginBottom: scale(32),
    lineHeight: fontSize(22),
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: margin.xl,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: borderRadius.lg,
    paddingHorizontal: padding.md,
    paddingVertical: padding.lg,
    marginRight: margin.md,
    backgroundColor: '#fff',
    minWidth: scale(100),
  },
  countryCode: {
    fontSize: fontSize(16),
    color: '#000',
    marginRight: padding.xs,
  },
  dropdownIcon: {
    fontSize: fontSize(12),
    color: '#666',
  },
  phoneInputContainer: {
    flex: 1,
  },
});
