import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from '@react-navigation/native';
import { navigate } from '../../navigation/navigationService';
import { RootStackParamList } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../utils/responsive';
import { Button, TextInput as CustomTextInput, PasswordInput, Separator, SocialButton, FooterLink } from '../../components';

export default function CreateNewAccountScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'CreateNewAccount'>>();
  const roleKey = route.params?.roleKey; // 1 = client, 2 = pro
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        <Text style={styles.title}>Create New Account</Text>
        <Text style={styles.subtitle}>Please sign up to your account</Text>

        <CustomTextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />

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
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Button
          title="Create New Account"
          onPress={() => {
            if (roleKey === 2) {
              navigate('BecomeProfessionalIntro');
            } else {
              navigate('MainTabs');
            }
          }}
          variant="primary"
          style={{ marginTop: margin.lg}}
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
