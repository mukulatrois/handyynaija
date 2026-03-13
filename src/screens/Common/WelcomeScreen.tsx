import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { navigate } from '../../navigation/navigationService';
import { fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import LoginSheet, { LoginSheetHandle } from './LoginScreen';
import { HandleBar, Button } from '../../components';

export default function WelcomeScreen() {
  const loginRef = useRef<LoginSheetHandle>(null);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Image
        source={require('../../Images/backwithlogo.png')}
        style={styles.image}
      />

      <View style={styles.bottom}>
        <HandleBar />
        <Button
          title="Create new account"
          onPress={() => navigate('RoleSelect',{type:"normal"})}
          variant="primary"
          style={{ marginBottom: margin.md }}
        />

        <Button
          title="Log in"
          onPress={() => loginRef.current?.open()}
          variant="secondary"
        />

        <Text style={styles.guest}>Continue as a guest</Text>
        <LoginSheet ref={loginRef} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover'
  },
  bottom: {
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


  guest: {
    textAlign: 'center',
    marginTop: margin.lg,
    color: '#555',
    fontSize: fontSize(14),
  },
});
