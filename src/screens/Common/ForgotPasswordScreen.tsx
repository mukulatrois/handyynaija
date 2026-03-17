import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { navigate } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../utils/responsive';
import { Button, FooterLink } from '../../components';
import TextInput from '../../components/TextInput';

const FORGOT_PASSWORD_API_URL = 'https://jolloyard-be.myfileshosting.com/api/v1/auth/forgot-password';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('Email is required')
    .email('Please enter a valid email address'),
});

type FormValues = { email: string };

const initialValues: FormValues = { email: '' };

export default function ForgotPasswordScreen() {
  const [loading, setLoading] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await fetch(FORGOT_PASSWORD_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: values.email.trim().toLowerCase() }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const message = data?.message ?? data?.error ?? `Request failed (${res.status})`;
          Alert.alert('Error', typeof message === 'string' ? message : JSON.stringify(message));
          return;
        }
        Alert.alert(
          'Check your email',
          'If an account exists for this email, you will receive a link to reset your password.',
          [{ text: 'OK', onPress: () => navigate('OTP', { email: values.email }) }]
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Network error. Please try again.';
        Alert.alert('Error', message);
      } finally {
        setLoading(false);
      }
    },
  });

  const { values, errors, touched, handleSubmit } = formik;

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
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email address and we'll send you a link to reset your password
        </Text>

        <TextInput
          label="Email"
          placeholder="Enter email"
          value={values.email}
          onChangeText={(text) => formik.setFieldValue('email', text)}
          onBlur={() => formik.setFieldTouched('email')}
          keyboardType="email-address"
          returnKeyType="done"
          blurOnSubmit={false}
          onSubmitEditing={() => handleSubmit()}
          autoCapitalize="none"
          error={touched.email ? errors.email : undefined}
          containerStyle={styles.emailInput}
        />

        <Button
          title={loading ? 'Sending...' : 'Continue'}
          onPress={() => handleSubmit()}
          variant="primary"
          disabled={loading}
          style={{ marginBottom: margin.xxl }}
        />

        <FooterLink
          text="Remember Password"
          linkText="Sign In"
          onPress={() => navigate('Welcome')}
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
  emailInput: {
    marginBottom: margin.xxl,
  },
});
