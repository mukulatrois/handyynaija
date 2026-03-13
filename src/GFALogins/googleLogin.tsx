import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { navigate } from '../navigation/navigationService';
import { Alert } from 'react-native';

const LOGIN_API_URL = 'https://jolloyard-be.myfileshosting.com/api/v1/auth/login';
const AUTH_TOKEN_KEY = 'auth_accessToken';
const AUTH_USER_KEY = 'auth_user';

export const googleLogin = async () => {
  try {
    const { data } = await GoogleSignin.signIn();
    const user = data?.user;

    if (!user) {
      console.log('Google sign-in cancelled or failed');
      return;
    }

    const { name, email }: any = user;
    const trimmedEmail = (email || '').trim().toLowerCase();

    try {
      const res = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          type: 'google',
        }),
      });

      const apiData = await res.json().catch(() => ({}));
console.log(apiData,"apiData");
console.log(res,"res");

      if (res.ok) {
        const { accessToken, token, user: apiUser } = apiData;
        const authToken = accessToken ?? token ?? '';
        const userPayload = {
          ...(apiUser || {}),
          name: apiUser?.name ?? name,
          email: apiUser?.email ?? trimmedEmail,
        };

        await AsyncStorage.setItem(AUTH_TOKEN_KEY, authToken);
        await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(userPayload));

        const role = apiUser?.role ?? apiUser?.userType;
        if (role === 2) {
          navigate('ProviderTabs');
        } else {
          navigate('MainTabs');
        }
        return;
      }else{
        const message = apiData?.message ?? apiData?.error ?? `Request failed (${res.status})`;
        
        if(message == "Invalid credentials."){
 navigate('RoleSelect', { type: 'google', name, email });
        }else{
          Alert.alert('Error', typeof message === 'string' ? message : JSON.stringify(message));
          return;
        }
       
      }
    } catch (apiErr) {
      console.log('Google login API error:', apiErr);
    }

   
  } catch (error) {
    console.log('Google login error:', error);
  }
};
