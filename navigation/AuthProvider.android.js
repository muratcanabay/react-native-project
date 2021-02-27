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
                  Alert.alert(
                    'User not found please check username and password!',
                  );
                  break;
                case 'auth/email-already-in-use':
                  console.log('Email address' + email + ' already in use');
                  break;
                case 'auth/invalid-email':
                  console.log('Email address' + email + 'is invalid.');
                  break;
                case 'auth/operation-not-allowed':
                  console.log('Error during sign up.');
                  break;
                case 'auth/weak-password':
                  console.log(
                    `Password is not strong enough. 
                    Add additional characters including special characters and numbers.`,
                  );
                  break;
                case 'auth/unknown':
                  Alert.alert('Please check your internet connection');
                default:
                  console.log(error.message);
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
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
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
