import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {windowHeight, windowWidth} from '../utils/Dimensions';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';

import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider.android';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignupScreen = ({navigation}) => {
  const [data, setData] = useState({
    mail: '',
    password: '',
    isValidMail: true,
    isValidPassword: true,
    showPassword: true,
  });

  const [error, setError] = useState({
    visible: false,
    errorTitle: '',
    errorDescription: '',
  });

  const {register, googleLogin, facebookLogin} = useContext(AuthContext);

  const onMailChange = (mail) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(mail) === true) {
      setData({
        ...data,
        mail: mail,
        isValidMail: true,
      });
    } else {
      setData({
        ...data,
        mail: mail,
        isValidMail: false,
      });
    }
  };

  const onPasswordChange = (password) => {
    if (password.trim().length >= 8) {
      setData({
        ...data,
        password: password,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: password,
        isValidPassword: false,
      });
    }
  };

  const showPassword = () => {
    setData({
      ...data,
      showPassword: !data.showPassword,
    });
  };

  const handleLogin = (mail, password) => {
    if (mail.trim() === '' || password.trim() === '') {
      setError({
        ...error,
        visible: true,
        errorTitle: 'Giriş Hatası',
        errorDescription: 'Email veya şifre alanı boş bırakılamaz.',
      });
      return false;
    }
    if (!data.isValidMail) {
      setError({
        ...error,
        visible: true,
        errorTitle: 'Giriş Hatası',
        errorDescription: 'Lütfen geçerli bir mail adresi giriniz.',
      });
      return false;
    }
    if (!data.isValidPassword) {
      setError({
        ...error,
        visible: true,
        errorTitle: 'Giriş Hatası',
        errorDescription: 'Şifre en az 8 karakter uzunluğunda olmalıdır.',
      });
      return false;
    }
    return true;
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={styles.container}>
      <Text style={styles.text}>Yeni Üyelik Oluştur</Text>

      <View style={styles.inputContainer}>
        <View style={styles.iconStyle}>
          <AntDesign name={'user'} size={25} color="#666" />
        </View>
        <TextInput
          value={data.mail}
          style={styles.input}
          numberOfLines={1}
          placeholder={'Email'}
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(userEmail) => onMailChange(userEmail)}
        />
      </View>

      {data.isValidMail ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>
            Lütfen geçerli bir mail adresi giriniz
          </Text>
        </Animatable.View>
      )}

      <View style={styles.inputContainer}>
        <View style={styles.iconStyle}>
          <AntDesign name={'lock'} size={25} color="#666" />
        </View>
        <TextInput
          value={data.password}
          style={styles.input}
          numberOfLines={1}
          placeholder={'Şifre'}
          placeholderTextColor="#666"
          secureTextEntry={data.showPassword ? true : false}
          onChangeText={(userPassword) => onPasswordChange(userPassword)}
        />
        <TouchableOpacity onPress={showPassword}>
          {data.showPassword ? (
            <Feather
              style={{marginRight: 6}}
              name="eye-off"
              color="grey"
              size={20}
            />
          ) : (
            <Feather
              style={{marginRight: 6}}
              name="eye"
              color="grey"
              size={20}
            />
          )}
        </TouchableOpacity>
      </View>

      {data.isValidPassword ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>
            Şifre en az 8 karakter uzunluğunda olmalıdır.
          </Text>
        </Animatable.View>
      )}

      <FormButton
        buttonTitle="Kaydol"
        onPress={() =>
          handleLogin(data.mail, data.password)
            ? register(data.mail, data.password)
            : null
        }
      />

      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Facebook'la Kaydol"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => facebookLogin()}
          />

          <SocialButton
            buttonTitle="Google'la Kaydol"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>
          Zaten üye misin? Üye girişi yap
        </Text>
      </TouchableOpacity>

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
    </KeyboardAwareScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 12,
  },
  // Form Style
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
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
