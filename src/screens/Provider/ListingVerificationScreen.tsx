import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
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
import { goBack, navigate } from '../../navigation/navigationService';
import { Button } from '../../components';

const PRIMARY_GREEN = '#3FA565';

export default function ListingVerificationScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      const pastedOtp = value.slice(0, 4).split('');
      const newOtp = [...otp];
      pastedOtp.forEach((char, i) => {
        if (index + i < 4) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + pastedOtp.length, 3);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    // TODO: Resend verification code
  };

  const handleContinue = () => {
    navigate('ListingAboutMe');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.headerButton}>
            <Icon name="chevron-back" size={scale(24)} color={PRIMARY_GREEN} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goBack}
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
          <Text style={styles.title}>2 Step verification</Text>
          <Text style={styles.subtitle}>
            We have sent the verification code to your email address
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
            <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
              <Text style={styles.resendLink}>Resend it.</Text>
            </TouchableOpacity>
          </View>

          <Button
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            style={styles.continueButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
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
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: padding.xl,
    paddingTop: margin.xxl,
    paddingBottom: margin.xxxl,
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: '700',
    color: PRIMARY_GREEN,
    marginBottom: padding.sm,
  },
  subtitle: {
    fontSize: fontSize(14),
    color: colors.text,
    lineHeight: fontSize(22),
    marginBottom: margin.xxl,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: margin.xxl,
    gap: padding.md,
  },
  otpInput: {
    flex: 1,
    height: scale(56),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    fontSize: fontSize(24),
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: margin.xxl,
    flexWrap: 'wrap',
  },
  resendText: {
    fontSize: fontSize(14),
    color: colors.text,
  },
  resendLink: {
    fontSize: fontSize(14),
    color: PRIMARY_GREEN,
    fontWeight: '600',
  },
  continueButton: {
    marginTop: margin.md,
  },
});
