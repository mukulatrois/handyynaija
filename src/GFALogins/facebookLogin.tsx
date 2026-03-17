import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { getAuth, FacebookAuthProvider, signInWithCredential } from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { navigate } from "../navigation/navigationService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOGIN_API_URL = 'https://jolloyard-be.myfileshosting.com/api/v1/auth/login';
const AUTH_TOKEN_KEY = 'auth_accessToken';
const AUTH_USER_KEY = 'auth_user';

export const facebookLogin = async () => {
  try {
    if (!LoginManager || !LoginManager.logInWithPermissions) {
      console.log("LoginManager is null or not initialized");
      return;
    }

    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);

    if (result.isCancelled) {
      console.log("User cancelled login");
      return;
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      console.log("Failed to get access token");
      return;
    }

    const auth = getAuth();

    const facebookCredential = FacebookAuthProvider.credential(
      data.accessToken
    );

    const userCredential = await signInWithCredential(auth, facebookCredential);

    console.log("User:", userCredential.user);
    let name :any= userCredential.user.displayName;
    let email:any = userCredential.user.email;
    const trimmedEmail = (email || '').trim().toLowerCase();

    try {
      const res = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          type: 'facebook',
        }),
      });

      const apiData = await res.json().catch(() => ({}));
      console.log(apiData, "apiData");
      console.log(res, "res");

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
      } else {
        const message = apiData?.message ?? apiData?.error ?? `Request failed (${res.status})`;

        if (message == "Invalid credentials.") {
          navigate('RoleSelect', { type: 'facebook', name, email });
        } else {
          Alert.alert('Error', typeof message === 'string' ? message : JSON.stringify(message));
          return;
        }

      }
    } catch (apiErr) {
      console.log('facebook login API error:', apiErr);
    }

  } catch (error) {
    console.log("Facebook Login Error:", error);
  }
};