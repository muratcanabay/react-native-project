import auth from '@react-native-firebase/auth';
import React, {createContext, useState} from 'react';

import {GoogleSignin} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {Alert} from 'react-native';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  let [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          await auth()
            .signInWithEmailAndPassword(email, password)
            .then((u) => {})
            .catch((error) => {
              switch (error.code) {
                case 'auth/user-not-found':
                  Alert.alert('E-posta adresi veya şifre yanlış');
                  break;
                case 'auth/email-already-in-use':
                  Alert.alert(
                    'Bu e-posta adresine sahip bir hesap bulunmaktadır',
                  );
                  break;
                case 'auth/invalid-email':
                  Alert.alert('Lütfen geçerli bir e-posta adresi girin');
                  break;
                case 'auth/operation-not-allowed':
                  Alert.alert('Giriş yaparken bir hata meydana geldi');
                  break;
                case 'auth/unknown':
                  Alert.alert(
                    'Lütfen internet bağlantınız olduğundan emin olun',
                  );
                default:
                  Alert.alert(error.message);
                  break;
              }
            });
        },
        googleLogin: async () => {
          try {
            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(
              idToken,
            );

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
          } catch (e) {
            console.log(e);
          }
        },
        facebookLogin: async () => {
          try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions([
              'public_profile',
              'email',
            ]);

            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(
              data.accessToken,
            );

            // Sign-in the user with the credential
            return auth().signInWithCredential(facebookCredential);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          await auth()
            .createUserWithEmailAndPassword(email, password)
            .then((u) => {})
            .catch((error) => {
              switch (error.code) {
                case 'auth/email-already-in-use':
                  Alert.alert(
                    'Bu e-posta adresine sahip bir hesap bulunmaktadır',
                  );
                  break;
                case 'auth/invalid-email':
                  Alert.alert('Lütfen geçerli bir e-posta adresi girin');
                  break;
                case 'auth/operation-not-allowed':
                  Alert.alert('Giriş yaparken bir hata meydana geldi');
                  break;
                case 'auth/unknown':
                  Alert.alert(
                    'Lütfen internet bağlantınız olduğundan emin olun',
                  );
                  break;
                default:
                  Alert.alert(error.message);
                  break;
              }
            });
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
