import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Alert, Keyboard } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { navigate } from '../../navigation/navigationService';
import { RootStackParamList } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import { Button } from '../../components';

const VERIFY_OTP_API_URL = 'https://jolloyard-be.myfileshosting.com/api/v1/auth/verify-otp';
const FORGOT_PASSWORD_API_URL = 'https://jolloyard-be.myfileshosting.com/api/v1/auth/forgot-password';

const OTP_LENGTH = 6;

const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .required('Please enter the OTP')
    .length(OTP_LENGTH, `Enter all ${OTP_LENGTH} digits`)
    .matches(new RegExp(`^\\d{${OTP_LENGTH}}$`), `OTP must be ${OTP_LENGTH} digits`),
});

type FormValues = { otp: string };

const initialValues: FormValues = { otp: '' };

type OTPScreenRouteProp = RouteProp<RootStackParamList, 'OTP'>;

export default function OTPScreen() {
  const route = useRoute<OTPScreenRouteProp>();

  console.log('route.params', route.params);
  
  const { type = 'email', phoneNumber, email } = route.params || {};
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      if (type === 'phone') {
        navigate('ProfileSetup');
        return;
      }
      // Email flow: verify OTP via API
      if (!email) {
        Alert.alert('Error', 'Email is required to verify OTP.');
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(VERIFY_OTP_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            otp: values.otp,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const message = data?.message ?? data?.error ?? `Verification failed (${res.status})`;
          Alert.alert('Error', typeof message === 'string' ? message : JSON.stringify(message));
          return;
        }
        navigate('ResetPassword', { email, otp: values.otp });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Network error. Please try again.';
        Alert.alert('Error', message);
      } finally {
        setLoading(false);
      }
    },
  });

  const { values, errors, touched, handleSubmit, setFieldValue, setFieldTouched, validateField } = formik;
  const otpDigits = Array.from({ length: OTP_LENGTH }, (_, i) => values.otp[i] || '');

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, '').slice(0, OTP_LENGTH);
      setFieldValue('otp', pasted, false);
      if (pasted.length === OTP_LENGTH) {
        setFieldTouched('otp', true, false);
        validateField('otp');
        Keyboard.dismiss();
      }
      const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = value.replace(/\D/g, '');
    const newOtp = newDigits.join('').slice(0, OTP_LENGTH);
    setFieldValue('otp', newOtp, false);

    if (newOtp.length === OTP_LENGTH) {
      setFieldTouched('otp', true, false);
      validateField('otp');
      Keyboard.dismiss();
    }

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    if (type === 'phone') {
      Alert.alert('Info', 'Phone OTP resend is not available yet.');
      return;
    }

    if (!email) {
      Alert.alert('Error', 'Email is required to resend OTP.');
      return;
    }

    setResendLoading(true);
    try {
      const res = await fetch(FORGOT_PASSWORD_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message = data?.message ?? data?.error ?? `Request failed (${res.status})`;
        Alert.alert('Error', typeof message === 'string' ? message : JSON.stringify(message));
        return;
      }
      Alert.alert(
        'Check your email',
        'If an account exists for this email, you will receive a link to reset your password.'
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Network error. Please try again.';
      Alert.alert('Error', message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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

        <View style={[styles.otpContainer, errors.otp && touched.otp && styles.otpContainerError]}>
          {otpDigits.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={[styles.otpInput, errors.otp && touched.otp && styles.otpInputError]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onBlur={() => setFieldTouched('otp', true)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>
        {errors.otp && touched.otp ? (
          <Text style={styles.errorText}>{errors.otp}</Text>
        ) : null}

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't get the code? </Text>
          <TouchableOpacity onPress={handleResendOtp} disabled={resendLoading || loading}>
            <Text style={styles.resendLink}>{resendLoading ? 'Sending...' : 'Resend it'}</Text>
          </TouchableOpacity>
        </View>

        <Button
          title={loading ? 'Verifying...' : 'Continue'}
          onPress={() => handleSubmit()}
          variant="primary"
          disabled={loading}
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
    marginBottom: padding.sm,
    paddingHorizontal: 0,
  },
  otpContainerError: {
    marginBottom: 0,
  },
  otpInput: {
    width: scale(48),
    height: scale(56),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: borderRadius.lg,
    fontSize: fontSize(24),
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  otpInputError: {
    borderColor: '#D32F2F',
  },
  errorText: {
    fontSize: fontSize(12),
    color: '#D32F2F',
    marginBottom: margin.xxl,
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
