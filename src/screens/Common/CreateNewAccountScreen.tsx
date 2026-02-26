import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { navigate } from '../../navigation/navigationService';
import { RootStackParamList } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../utils/responsive';
import { Button, TextInput as CustomTextInput, PasswordInput, Separator, SocialButton, FooterLink } from '../../components';

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
  email: Yup.string()
    .trim()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialValues: FormValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function CreateNewAccountScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'CreateNewAccount'>>();
  const roleKey = route.params?.roleKey; // 1 = client, 2 = pro

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      // TODO: call signup API with values
      if (roleKey === 2) {
        navigate('BecomeProfessionalIntro');
      } else {
        navigate('MainTabs');
      }
    },
  });

  const { values, errors, touched, handleSubmit, setFieldTouched } = formik;

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
        <Text style={styles.title}>Create New Account</Text>
        <Text style={styles.subtitle}>Please sign up to your account</Text>

        <CustomTextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={values.fullName}
          onChangeText={(text) => formik.setFieldValue('fullName', text)}
          onBlur={() => formik.setFieldTouched('fullName')}
          autoCapitalize="words"
          error={touched.fullName && errors.fullName ? errors.fullName : undefined}
        />

        <CustomTextInput
          label="Email Address"
          placeholder="email@gmail.com"
          value={values.email}
          onChangeText={(text) => formik.setFieldValue('email', text)}
          onBlur={() => formik.setFieldTouched('email')}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          error={touched.email && errors.email ? errors.email : undefined}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={values.password}
          onChangeText={(text) => formik.setFieldValue('password', text)}
          error={touched.password && errors.password ? errors.password : undefined}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={values.confirmPassword}
          onChangeText={(text) => formik.setFieldValue('confirmPassword', text)}
          error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
        />

        <Button
          title="Create New Account"
          onPress={() => {
            setFieldTouched('fullName');
            setFieldTouched('email');
            setFieldTouched('password');
            setFieldTouched('confirmPassword');
            handleSubmit();
          }}
          variant="primary"
          style={{ marginTop: margin.lg }}
        />

        <Separator />

        <SocialButton provider="facebook" onPress={() => { }} />
        <SocialButton provider="google" onPress={() => { }} />
        <SocialButton provider="apple" onPress={() => { }} />

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
  },
});
