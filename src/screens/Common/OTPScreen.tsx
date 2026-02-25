import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp } from '@react-navigation/native';
import { navigate } from '../../navigation/navigationService';
import { RootStackParamList } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import { Button } from '../../components';

type OTPScreenRouteProp = RouteProp<RootStackParamList, 'OTP'>;

export default function OTPScreen() {
  const route = useRoute<OTPScreenRouteProp>();
  const { type = 'email', phoneNumber } = route.params || {};
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      // Handle paste
      const pastedOtp = value.slice(0, 4).split('');
      const newOtp = [...otp];
      pastedOtp.forEach((char, i) => {
        if (index + i < 4) {
          newOtp[index + i] = char;
        }
      });
      setOtp(newOtp);
      // Focus next empty input
      const nextIndex = Math.min(index + pastedOtp.length, 3);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
                  source={require('../../Images/logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          {type === 'phone' 
            ? `We have sent the verification code to ${phoneNumber || 'your phone number'}`
            : 'We have sent the verification code to your email address'}
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't get the code? </Text>
          <TouchableOpacity>
            <Text style={styles.resendLink}>Resend it</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Continue"
          onPress={() => {
            if (type === 'phone') {
              navigate('ProfileSetup');
            } else {
              navigate('ResetPassword');
            }
          }}
          variant="primary"
          style={{ marginBottom: scale(40) }}
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
  logo: {
    width: scale(180),
    height: scale(180),
    alignSelf: 'center',
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: margin.xxl,
    paddingHorizontal: 0,
  },
  otpInput: {
    width: scale(60),
    height: scale(60),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: borderRadius.lg,
    fontSize: fontSize(24),
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(32),
  },
  resendText: {
    fontSize: fontSize(14),
    color: '#666',
  },
  resendLink: {
    fontSize: fontSize(14),
    color: '#4285F4',
    fontWeight: '600',
  },
});
