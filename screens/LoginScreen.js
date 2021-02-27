import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {windowHeight, windowWidth} from '../utils/Dimensions';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider.android';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = ({navigation}) => {
  const [data, setData] = useState({
    mail: '',
    password: '',
    isValidMail: true,
    isValidPassword: true,
    showPassword: true,
  });

  const {login, googleLogin, facebookLogin} = useContext(AuthContext);

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
    console.log(mail);
    console.log(password);
    if (mail.trim() === '' || password.trim() === '') {
      Alert.alert('Username and password cannot be empty!');
      return false;
    }
    if (!data.isValidMail) {
      Alert.alert(mail + ' is not a valid e-mail address!');
      return false;
    }
    if (!data.isValidPassword) {
      Alert.alert('Password is too short!');
      return false;
    }
    return true;
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'always'}
      style={{flex: 1}}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/rn-social-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Video to 3D Model</Text>

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
          <Text style={styles.errorMsg}>Invalid mail adress.</Text>
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
          placeholder={'Password'}
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
            Password must be 8 characters long.
          </Text>
        </Animatable.View>
      )}

      <FormButton
        buttonTitle="Sign In"
        onPress={() =>
          handleLogin(data.mail, data.password)
            ? login(data.mail, data.password)
            : null
        }
      />
      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => facebookLogin()}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => {
              googleLogin();
            }}
          />
        </View>
      ) : null}
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
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
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
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
});
