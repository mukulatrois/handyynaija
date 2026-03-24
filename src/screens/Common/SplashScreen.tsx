import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { scale, fontSize, margin } from '../../utils/responsive';
import { RootStackParamList } from '../../navigation/navigationService';
import { getProviderRegisterState } from '../../providerRegister/providerRegisterStore';
import { COLORS } from '../../utils/constants';

const AUTH_TOKEN_KEY = 'auth_accessToken';
const AUTH_USER_KEY = 'auth_user';
const MIN_SPLASH_MS = 1500;

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SplashScreen() {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      const start = Date.now();

      try {
        const [token, storedUser, providerRegister] = await Promise.all([
          AsyncStorage.getItem(AUTH_TOKEN_KEY),
          AsyncStorage.getItem(AUTH_USER_KEY),
          getProviderRegisterState(),
        ]);

        const isLoggedIn = Boolean(token) || Boolean(storedUser);
const isRegistered = await AsyncStorage.getItem("isRegistered");
        let userType: number | undefined;
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            userType = user?.userType ?? user?.role ?? user?.roleKey;
          } catch {
            // ignore parse errors
          }
        }

        const isProviderProfileCompleted =
          providerRegister &&
          Boolean(providerRegister.profileInfo) &&
          providerRegister.photoSelected === true;

        const elapsed = Date.now() - start;
        const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);

        setTimeout(() => {
          if (isLoggedIn) {
            if (userType === 2) {
              if (isRegistered && !isProviderProfileCompleted) {
                navigation.replace('ProviderSelectCountry');
              } else {
                navigation.replace('ProviderTabs');
              }
            } else {
              navigation.replace('MainTabs');
            }
          } else {
            navigation.replace('Welcome');
          }
        }, remaining);
      } catch {
        setTimeout(() => navigation.replace('Welcome'), MIN_SPLASH_MS);
      }
    };

    checkAuthAndNavigate();
  }, [navigation]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../Images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Jollo<Text style={{color:COLORS.PRIMARY}}>yard</Text></Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: scale(180),
    height: scale(180),
    marginBottom: margin.xl,
  },
  appName: {
    fontSize: fontSize(28),
    fontWeight: 'bold',
    color: COLORS.SECONDARY,
  },
});
