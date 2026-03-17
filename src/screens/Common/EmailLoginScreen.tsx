import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput as RNTextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { navigate } from '../../navigation/navigationService';
import { fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import RBSheet from 'react-native-raw-bottom-sheet';
import { HandleBar, CloseButton, TextInput as CustomTextInput, PasswordInput, Checkbox, Button } from '../../components';

const LOGIN_API_URL = 'https://jolloyard-be.myfileshosting.com/api/v1/auth/login';
const AUTH_TOKEN_KEY = 'auth_accessToken';
const AUTH_USER_KEY = 'auth_user';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: Yup.string()
    .required('Password is required'),
});

type FormValues = {
  email: string;
  password: string;
};

const initialValues: FormValues = {
  email: '',
  password: '',
};

export type LoginEmailHandle = {
  open: () => void;
  close: () => void;
};

const EmailLoginScreen = forwardRef<LoginEmailHandle>((_, ref) => {
  const refRBSheet = useRef<any>(null);
  const passwordRef = useRef<RNTextInput | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(LOGIN_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: values.email.trim().toLowerCase(),
            password: values.password,
          }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          const message = data?.message ?? data?.error ?? `Request failed (${res.status})`;
          setError(typeof message === 'string' ? message : JSON.stringify(message));
          return;
        }

        const { accessToken, user } = data;
        console.log(data,"data");
        
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, accessToken);
        await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

        refRBSheet.current?.close();
        if (user.role === 2) {
          navigate('ProviderTabs');
        } else {
          navigate('MainTabs');
        }
        // navigate('MainTabs');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Network error. Please try again.';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
  });

  useImperativeHandle(ref, () => ({
    open: () => {
      setError(null);
      formik.resetForm();
      refRBSheet.current?.open();
    },
    close: () => refRBSheet.current?.close(),
  }));

  const { values, errors, touched, handleSubmit, setFieldTouched } = formik;

  return (
    <RBSheet
      ref={refRBSheet}
      height={560}
      openDuration={250}
      customStyles={{
        container: styles.sheet,
      }}
    >
      <HandleBar />

      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
        <CloseButton onPress={() => refRBSheet.current?.close()} />
      </View>

      <CustomTextInput
        label="Email Address"
        placeholder="email@gmail.com"
        value={values.email}
        onChangeText={(t) => formik.setFieldValue('email', t)}
        onBlur={() => formik.setFieldTouched('email')}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => passwordRef.current?.focus()}
        error={touched.email && errors.email ? errors.email : undefined}
      />

      <PasswordInput
        label="Password"
        placeholder="********"
        value={values.password}
        onChangeText={(t) => formik.setFieldValue('password', t)}
        returnKeyType="done"
        inputRef={passwordRef}
        onSubmitEditing={() => {
          setFieldTouched('email');
          setFieldTouched('password');
          handleSubmit();
        }}
        error={touched.password && errors.password ? errors.password : undefined}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={{ marginBottom: margin.xxl ,alignSelf: 'flex-end'}} onPress={() => navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>

      <Button
        title={loading ? 'Logging in...' : 'Log in'}
        onPress={() => {
          setFieldTouched('email');
          setFieldTouched('password');
          handleSubmit();
        }}
        variant="primary"
        disabled={loading}
      />
    </RBSheet>
  );
});

export default EmailLoginScreen;

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: padding.xl,
    paddingTop: padding.md,
    backgroundColor: '#fff',
    borderTopLeftRadius: borderRadius.xxxl,
    borderTopRightRadius: borderRadius.xxxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: margin.xxl,
  },
  title: {
    fontSize: fontSize(22),
    fontWeight: 'bold',
    color: '#000',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: margin.xxl,
  },
  forgotPassword: {
    fontSize: fontSize(14),
    color: '#666',
  },
  errorText: {
    fontSize: fontSize(14),
    color: '#D32F2F',
    marginBottom: margin.lg,
  },
});
