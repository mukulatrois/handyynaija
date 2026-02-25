import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { navigate } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import { Button, FooterLink } from '../../components';

export default function ForgotPasswordScreen() {
  const [selectedMethod, setSelectedMethod] = useState('email');

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
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Select which contact details should we used to reset your password
        </Text>

        <TouchableOpacity style={styles.contactBox}>
          <View style={styles.contactLeft}>
            <Text style={styles.emailIcon}>✉️</Text>
            <View>
              <Text style={styles.contactLabel}>Via Email</Text>
              <Text style={styles.contactValue}>gdg***fsf@azlotv.com</Text>
            </View>
          </View>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        <Button
          title="Continue"
          onPress={() => navigate('OTP')}
          variant="primary"
          style={{ marginBottom: margin.xxl }}
        />

        <FooterLink
          text="Remember Password"
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
  contactBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: borderRadius.lg,
    padding: padding.lg,
    marginBottom: margin.xxl,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emailIcon: {
    fontSize: fontSize(24),
    marginRight: margin.md,
  },
  contactLabel: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: '#000',
    marginBottom: scale(4),
  },
  contactValue: {
    fontSize: fontSize(14),
    color: '#666',
  },
  dropdownIcon: {
    fontSize: fontSize(16),
    color: '#666',
  },
});
