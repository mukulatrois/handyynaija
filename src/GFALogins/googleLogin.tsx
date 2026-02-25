import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const googleLogin = async () => {
  try {
    const signInResult = await GoogleSignin.signIn();

    const idToken = signInResult.data?.idToken;

    if (!idToken) {
      throw new Error('No ID token found');
    }

    const googleCredential =
      auth.GoogleAuthProvider.credential(idToken);

    const user = await auth().signInWithCredential(googleCredential);

    console.log('User:', user.user);
  } catch (error) {
    console.log('Google login error:', error);
  }
};
