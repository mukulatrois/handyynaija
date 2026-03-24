import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { navigate, goBack } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import { Button, TextInput as CustomTextInput } from '../../components';
import CustomIcon, { IconNames } from '../../components/Icon';
import { COLORS } from '../../utils/constants';

type ProfileStep = 'name' | 'location' | 'contact';

export default function ProfileSetupScreen() {
  const [step, setStep] = useState<ProfileStep>('name');
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = () => {
    if (step === 'name') {
      if (fullName.trim()) {
        setStep('location');
      }
    } else if (step === 'location') {
      if (location.trim()) {
        setStep('contact');
      }
    } else if (step === 'contact') {
      // Navigate to main app (Home tabs)
      navigate('MainTabs');
    }
  };

  const handleSkip = () => {
    if (step === 'name') {
      setStep('location');
    } else if (step === 'location') {
      setStep('contact');
    } else {
      navigate('MainTabs');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {step !== 'name' && (
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <CustomIcon name={IconNames.arrowBack} size={fontSize(20)} color="#000" />
          </TouchableOpacity>
        )}

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, step === 'name' && styles.progressBarActive]} />
          <View style={[styles.progressBar, step === 'location' && styles.progressBarActive]} />
          <View style={[styles.progressBar, step === 'contact' && styles.progressBarActive]} />
        </View>

        {step === 'name' && (
          <>
            <Text style={styles.title}>What's your name?</Text>
            <Text style={styles.subtitle}>This will be displayed on your profile</Text>
            <CustomTextInput
              label="Full Name"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              containerStyle={{ marginTop: margin.xl }}
            />
          </>
        )}

        {step === 'location' && (
          <>
            <Text style={styles.title}>Where are you located?</Text>
            <Text style={styles.subtitle}>Help us find services near you</Text>
            <CustomTextInput
              label="City/State"
              placeholder="Enter your city or state"
              value={location}
              onChangeText={setLocation}
              containerStyle={{ marginTop: margin.xl }}
            />
            <CustomTextInput
              label="Address (Optional)"
              placeholder="Enter your address"
              value={address}
              onChangeText={setAddress}
            />
          </>
        )}

        {step === 'contact' && (
          <>
            <Text style={styles.title}>Contact Details</Text>
            <Text style={styles.subtitle}>How can we reach you?</Text>
            <CustomTextInput
              label="Phone Number"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              containerStyle={{ marginTop: margin.xl }}
            />
            <CustomTextInput
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </>
        )}

        <View style={styles.buttonContainer}>
          {step !== 'name' && (
            <Button
              title="Skip"
              onPress={handleSkip}
              variant="secondary"
              style={{ flex: 1, marginRight: margin.md }}
            />
          )}
          <Button
            title={step === 'contact' ? 'Complete' : 'Next'}
            onPress={handleNext}
            variant="primary"
            style={{ flex: step === 'name' ? 1 : 1 }}
            disabled={
              (step === 'name' && !fullName.trim()) ||
              (step === 'location' && !location.trim()) ||
              (step === 'contact' && !phoneNumber.trim() && !email.trim())
            }
          />
        </View>
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
  progressContainer: {
    flexDirection: 'row',
    marginBottom: margin.xxl,
    gap: margin.sm,
  },
  progressBar: {
    flex: 1,
    height: scale(4),
    backgroundColor: '#E0E0E0',
    borderRadius: borderRadius.sm,
  },
  progressBarActive: {
    backgroundColor: COLORS.PRIMARY,
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
  buttonContainer: {
    flexDirection: 'row',
    marginTop: margin.xxl,
    gap: margin.md,
  },
});
