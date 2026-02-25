import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, fontSize, padding, margin } from '../../utils/responsive';
import { PasswordInput, Button } from '../../components';

export default function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <PasswordInput
          label="Confirm New Password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Button
          title="Continue"
          onPress={() => { }}
          variant="primary"
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
