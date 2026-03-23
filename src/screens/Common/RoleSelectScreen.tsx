import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native-safe-area-context";
import { navigate, goBack } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import CustomIcon, { IconNames } from '../../components/Icon';
import { Button } from '../../components';
import { COLORS } from '../../utils/constants';

const REGISTER_API_URL = 'https://jolloyard-be.myfileshosting.com/api/v1/auth/register';
const AUTH_TOKEN_KEY = 'auth_accessToken';
const AUTH_USER_KEY = 'auth_user';

export default function RoleSelectScreen(props: any) {
  const [selected, setSelected] = useState<'client' | 'pro' | null>(null);
  const [loading, setLoading] = useState(false);
  const { type, name, email } = props.route?.params ?? {};

  const handleContinue = async () => {
    if (!selected) return;
    const roleKey = selected === 'client' ? 3 : 2;

    if (type === 'normal') {
      navigate('CreateNewAccount', { roleKey: roleKey as 2 | 3 });
      return;
    }

    if (!name?.trim() || !email?.trim()) {
      Alert.alert('Error', 'Name and email are required to continue.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(REGISTER_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(name).trim(),
          email: String(email).trim().toLowerCase(),
          // password: '', // Social signup - backend may use provider token
          role: roleKey,
          type: type,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message = data?.message ?? data?.error ?? `Request failed (${res.status})`;
        Alert.alert('Error', typeof message === 'string' ? message : JSON.stringify(message));
        return;
      }

      const { user, accessToken, token } = data;
      const authToken = accessToken ?? token ?? '';

      const userPayload = {
        ...(user || {}),
        name: user?.name ?? String(name).trim(),
        email: user?.email ?? String(email).trim().toLowerCase(),
        userType: user?.userType ?? user?.role ?? roleKey,
      };

      await AsyncStorage.multiSet([
        [AUTH_TOKEN_KEY, authToken],
        [AUTH_USER_KEY, JSON.stringify(userPayload)],
        ["isRegistered","true"]
      ]);

      if (roleKey === 2) {
        navigate('BecomeProfessionalIntro');
      } else {
        navigate('MainTabs');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Network error. Please try again.';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <CustomIcon name={IconNames.arrowBack} size={fontSize(20)} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>
        What will you do on{'\n'}JolloYard?
      </Text>

      <Text style={styles.subtitle}>
        This decision is not final. you can later be both a client and a professional from the same account if you wish.
      </Text>

      {/* Client card */}
      <TouchableOpacity
        style={[styles.card, selected === 'client' && styles.activeCard]}
        onPress={() => setSelected('client')}>

        <Image
          source={require('../../Images/logo.png')}
          style={styles.img}
        />

        <View style={styles.cardContent}>
          <Text style={styles.big}>Book a service</Text>
          <Text style={styles.small}>(I'm a Client)</Text>
        </View>
      </TouchableOpacity>

      {/* Pro card */}
      <TouchableOpacity
        style={[styles.card, selected === 'pro' && styles.activeCard]}
        onPress={() => setSelected('pro')}>

        <Image
          source={require('../../Images/logo.png')}
          style={styles.img}
        />

        <View style={styles.cardContent}>
          <Text style={styles.big}>Offer services</Text>
          <Text style={styles.small}>(I'm a Professional)</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Button
          title={loading ? 'Please wait...' : 'Continue'}
          onPress={handleContinue}
          variant="primary"
          disabled={!selected || loading}
        />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: padding.xl,
    backgroundColor: 'white', // soft grey like screenshot
  },

  backButton: {
    marginBottom: margin.xl,
    width: scale(40),
  },

  title: {
    fontSize: fontSize(28),
    fontWeight: '700',
    marginBottom: margin.md,
    color: '#1B3556', // navy blue
  },

  subtitle: {
    fontSize: fontSize(18),
    color: '#555',
    marginBottom: margin.xxl,
    lineHeight: fontSize(20),
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: padding.lg,
    borderRadius: borderRadius.xl,
    marginBottom: margin.lg,
    borderWidth: 1.5,
    borderColor: "lightgrey",
  },

  activeCard: {
    borderWidth: 1.5,
    borderColor: COLORS.SECONDARY, // highlighted card
  },

  img: {
    width: scale(72),
    height: scale(72),
    borderRadius: borderRadius.lg,
    marginRight: padding.lg,
  },

  cardContent: {
    flex: 1,
  },

  big: {
    fontWeight: '700',
    fontSize: fontSize(18),
    color: '#1B3556',
    marginBottom: scale(4),
  },

  small: {
    color: '#333',
    fontSize: fontSize(14),
  },

  footer: {
    marginTop: 'auto',
    paddingTop: margin.xl,
  },
});
