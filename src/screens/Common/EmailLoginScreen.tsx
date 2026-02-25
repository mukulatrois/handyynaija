import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { navigate } from '../../navigation/navigationService';
import { fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import RBSheet from 'react-native-raw-bottom-sheet';
import { HandleBar, CloseButton, TextInput as CustomTextInput, PasswordInput, Checkbox, Button } from '../../components';

export type LoginEmailHandle = {
  open: () => void;
  close: () => void;
};

const EmailLoginScreen = forwardRef<LoginEmailHandle>((_, ref) => {
  const refRBSheet = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    open: () => refRBSheet.current?.open(),
    close: () => refRBSheet.current?.close(),
  }));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <PasswordInput
        label="Password"
        placeholder="********"
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.optionsRow}>
        <Checkbox
          label="Remember me"
          checked={rememberMe}
          onPress={() => setRememberMe(!rememberMe)}
        />

        <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Log in"
        onPress={() => {
          // After successful login, navigate to main tabs
          refRBSheet.current?.close();
          navigate('MainTabs');
        }}
        variant="primary"
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
});
