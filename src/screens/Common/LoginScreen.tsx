import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { borderRadius, fontSize, margin, padding } from '../../utils/responsive';
import EmailLoginScreen, { LoginEmailHandle } from './EmailLoginScreen';
import { HandleBar, CloseButton, Separator, SocialButton, Button } from '../../components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { googleLogin } from '../../GFALogins/googleLogin';
import { facebookLogin } from '../../GFALogins/facebookLogin';
import { COLORS } from '../../utils/constants';
export type LoginSheetHandle = {
  open: () => void;
  close: () => void;
};

const LoginSheet = forwardRef<LoginSheetHandle, {}>((_, ref) => {
  const refRBSheet = useRef<any>(null);
  const loginRef = useRef<LoginEmailHandle>(null);


  useImperativeHandle(ref, () => ({
    open: () => refRBSheet.current?.open(),
    close: () => refRBSheet.current?.close(),
  }));

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '783142289414-ehsu08vtfra5ol5f67tq9obtmoq9qt90.apps.googleusercontent.com',
    });
  }, []);

  return (
    <>
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

        <SocialButton provider="apple" onPress={() => { }} />
        <SocialButton provider="facebook" onPress={facebookLogin} />
        <SocialButton provider="google" onPress={googleLogin} />

        <Separator />

        <Button
          title="Log in with email"
          onPress={() => {
            refRBSheet.current?.close();
            loginRef.current?.open();
          }}
          variant="primary"
        />

        <Text style={styles.legalText}>
          Terms & Privacy Policy
        </Text>
      </RBSheet>

      <EmailLoginScreen ref={loginRef} />
    </>
  );
});

export default LoginSheet;

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
    marginBottom: margin.xl,
  },
  title: {
    fontSize: fontSize(22),
    fontWeight: 'bold',
    color: '#000',
  },
  legalText: {
    fontSize: fontSize(12),
    color: '#666',
    textAlign: 'center',
    lineHeight: fontSize(18),
    marginTop: margin.xl,
  },
  link: {
    color: COLORS.PRIMARY,
    textDecorationLine: 'underline',
  },
});
