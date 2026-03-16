import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { getAuth, FacebookAuthProvider, signInWithCredential } from "@react-native-firebase/auth";

export const facebookLogin = async () => {
  try {

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

  } catch (error) {
    console.log("Facebook Login Error:", error);
  }
};