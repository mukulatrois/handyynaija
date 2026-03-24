import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { navigate } from '../../navigation/navigationService';
import { fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import LoginSheet, { LoginSheetHandle } from './LoginScreen';
import { HandleBar, Button } from '../../components';
import { height, width } from '../../components/common';

export default function WelcomeScreen() {
  const loginRef = useRef<LoginSheetHandle>(null);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Image
        source={require('../../Images/backimage.png')}
        style={styles.image}
      />
      <View style={{
        position: "absolute", backgroundColor: "black", height: "100%",
        width: '100%', opacity: 0.4
      }} ></View>
      <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', alignSelf: "center", marginTop: height / 10 }}>
        <Image source={require('../../Images/logo2.png')} tintColor="white" resizeMode="contain" style={{ width: width / 2.5, height: height / 20, marginBottom: 10 }} />
        <Text style={{ color: 'white', fontSize: fontSize(18), fontWeight: 'bold', textAlign: "center" }}>Doorstep convenience for{'\n'} any services</Text>
      </View>

      <View style={styles.bottom}>
        <HandleBar />
        <Button
          title="Create new account"
          onPress={() => navigate('RoleSelect', { type: "normal" })}
          variant="primary"
          style={{ marginBottom: margin.md, backgroundColor: '#49712E' }}
        />

        <Button
          title="Log in"
          onPress={() => loginRef.current?.open()}
          variant="secondary"
          style={{ backgroundColor: "#FC5911" }}
        />

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
