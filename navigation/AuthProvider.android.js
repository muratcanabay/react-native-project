import auth from '@react-native-firebase/auth';
import React, {createContext, useState, Fragment} from 'react';

import {GoogleSignin} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {Modal, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  const [error, setError] = useState({
    visible: false,
    errorTitle: '',
    errorDescription: '',
  });

  let [user, setUser] = useState(null);
  return (
    <Fragment>
      <Modal visible={error.visible} transparent={true} animationType={'fade'}>
        <View style={styles.mainOuterComponent}>
          <View style={styles.mainContainer}>
            <View style={styles.topPart}>
              <LottieView
                source={require('../assets/lottie/bell.json')}
                resizeMode={'contain'}
                style={styles.alertIconStyle}
                autoPlay
                loop
              />
              <Text style={styles.alertTitleTextStyle}>{error.errorTitle}</Text>
            </View>
            <View style={styles.middlePart}>
              <Text style={styles.alertMessageTextStyle}>
                {error.errorDescription}
              </Text>
            </View>
            <View style={styles.bottomPart}>
              <TouchableOpacity
                onPress={() =>
                  setError({
                    visible: false,
                  })
                }
                style={styles.alertMessageButtonStyle}>
                <Text style={styles.alertMessageButtonTextStyle}>Tamam</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
                    setError({
                      ...error,
                      visible: true,
                      errorTitle: 'Giriş Hatası',
                      errorDescription:
                        'Bu e-posta ile kayıtlı kullanıcı bulunamadı.',
                    });
                    break;
                  case 'auth/wrong-password':
                    setError({
                      ...error,
                      visible: true,
                      errorTitle: 'Giriş Hatası',
                      errorDescription: 'E-posta veya şifreyi hatalı girdiniz.',
                    });
                    break;
                  case 'auth/invalid-email':
                    setError({
                      ...error,
                      visible: true,
                      errorTitle: 'Giriş Hatası',
                      errorDescription:
                        'Lütfen geçerli bir e-posta adresi giriniz.',
                    });
                    break;
                  case 'auth/operation-not-allowed':
                    setError({
                      ...error,
                      visible: true,
                      errorTitle: 'Giriş Hatası',
                      errorDescription:
                        'Giriş yaparken bir hata meydana geldi.',
                    });
                    break;
                  case 'auth/unknown':
                    setError({
                      ...error,
                      visible: true,
                      errorTitle: 'Giriş Hatası',
                      errorDescription:
                        'Lütfen internet bağlantınız olduğundan emin olun.',
                    });
                    break;
                  case 'auth/too-many-requests':
                    setError({
                      ...error,
                      visible: true,
                      errorTitle: 'Giriş Hatası',
                      errorDescription:
                        'Bu hesap için çok sayıda istekte bulundunuz. Lütfen daha sonra tekrar giriş yapın.',
                    });
                    break;
                  default:
                    setError({
                      ...error,
                      visible: true,
                      errorTitle: 'Giriş Hatası',
                      errorDescription: 'Beklenmeyen bir hata meydana geldi.',
                    });
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
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then((u) => {})
              .catch((error) => {
                switch (error.code) {
                  case 'auth/email-already-in-use':
                    setError({
                      ...error,
                      visible: true,
                      errorTitle: 'Kayıt Hatası',
                      errorDescription:
                        'Bu e-posta adresine sahip bir hesap bulunmaktadır.',
                    });
                    break;
                  case 'auth/invalid-email':
                    setError({
                      ...error,
                      visible: true,
                      errorTitle: 'Kayıt Hatası',
                      errorDescription:
                        'Lütfen geçerli bir e-posta adresi girin.',
                    });
                    break;
                  case 'auth/operation-not-allowed':
                    setError({
                      ...error,
                      visible: true,
                      errorTitle: 'Kayıt Hatası',
                      errorDescription:
                        'Giriş yaparken bir hata meydana geldi.',
                    });
                    break;
                  case 'auth/unknown':
                    setError({
                      ...error,
                      visible: true,
                      errorTitle: 'Kayıt Hatası',
                      errorDescription:
                        'Lütfen internet bağlantınız olduğundan emin olun.',
                    });
                    break;
                  default:
                    setError({
                      ...error,
                      visible: true,
                      errorTitle: 'Kayıt Hatası',
                      errorDescription:
                        'Kayıt olurken beklenmeyen bir hata meydana geldi.',
                    });
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
    </Fragment>
  );
};

const styles = StyleSheet.create({
  // Alert Style
  mainOuterComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000088',
  },
  mainContainer: {
    flexDirection: 'column',
    height: '25%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BDBDBD',
    borderRadius: 10,
    padding: 4,
  },
  topPart: {
    flex: 0.5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  middlePart: {
    flex: 1,
    width: '100%',
    padding: 4,
    color: '#FFFFFF',
    fontSize: 16,
    marginVertical: 2,
  },
  bottomPart: {
    flex: 0.5,
    width: '100%',
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-evenly',
  },
  alertIconStyle: {
    height: 35,
    width: 35,
  },
  alertTitleTextStyle: {
    flex: 1,
    textAlign: 'justify',
    color: '#607D8B',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 2,
    marginHorizontal: 2,
  },
  alertMessageTextStyle: {
    color: '#424242',
    textAlign: 'justify',
    fontSize: 16,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  alertMessageButtonStyle: {
    width: '30%',
    paddingHorizontal: 6,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: '#90A4AE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertMessageButtonTextStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#424242',
  },
});
