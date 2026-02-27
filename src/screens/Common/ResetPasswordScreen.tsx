import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { navigate } from '../../navigation/navigationService';
import { RootStackParamList } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../utils/responsive';
import { PasswordInput, Button } from '../../components';

const RESET_PASSWORD_API_URL = 'https://jolloyard-be.myfileshosting.com/api/v1/auth/reset-password';

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
});

type FormValues = { newPassword: string; confirmPassword: string };

const initialValues: FormValues = { newPassword: '', confirmPassword: '' };

type ResetPasswordScreenRouteProp = RouteProp<RootStackParamList, 'ResetPassword'>;

export default function ResetPasswordScreen() {
  const route = useRoute<ResetPasswordScreenRouteProp>();
  const { email, otp } = route.params || {};
  const [loading, setLoading] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      if (!email || !otp) {
        Alert.alert('Error', 'Email and OTP are required. Please go back and try again.');
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(RESET_PASSWORD_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            otp,
            newPassword: values.newPassword,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const message = data?.message ?? data?.error ?? `Reset failed (${res.status})`;
          Alert.alert('Error', typeof message === 'string' ? message : JSON.stringify(message));
          return;
        }
        Alert.alert(
          'Password Reset',
          'Your password has been reset successfully.',
          [{ text: 'OK', onPress: () => navigate('Welcome') }]
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Network error. Please try again.';
        Alert.alert('Error', message);
      } finally {
        setLoading(false);
      }
    },
  });

  const { values, errors, touched, handleSubmit, setFieldValue, setTouched } = formik;

  const handleContinue = () => {
    setTouched({ newPassword: true, confirmPassword: true });
    handleSubmit();
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
        <Text style={styles.title}>Reset Password</Text>

        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          value={values.newPassword}
          onChangeText={(text) => formik.setFieldValue('newPassword', text)}
          error={touched.newPassword ? errors.newPassword : undefined}
        />

        <PasswordInput
          label="Confirm New Password"
          placeholder="Confirm new password"
          value={values.confirmPassword}
          onChangeText={(text) => formik.setFieldValue('confirmPassword', text)}
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
        />

        <Button
          title={loading ? 'Resetting...' : 'Continue'}
          onPress={handleContinue}
          variant="primary"
          disabled={loading}
          style={{ marginTop: padding.sm, marginBottom: scale(40) }}
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
    marginBottom: scale(32),
  },
});
