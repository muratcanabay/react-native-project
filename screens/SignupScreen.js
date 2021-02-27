import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
} from 'react-native';

import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider.android';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {windowHeight, windowWidth} from '../utils/Dimensions';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Yeni Üyelik Oluştur</Text>

      <View style={styles.inputContainer}>
        <View style={styles.iconStyle}>
          <AntDesign name={'user'} size={25} color="#666" />
        </View>
        <TextInput
          value={email}
          style={styles.input}
          numberOfLines={1}
          placeholder={'Email'}
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(userEmail) => usernameValidation(userEmail)}
          onChangeText={(userEmail) => setEmail(userEmail)}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconStyle}>
          <AntDesign name={'lock'} size={25} color="#666" />
        </View>
        <TextInput
          value={password}
          style={styles.input}
          numberOfLines={1}
          placeholder={'Şifre'}
          placeholderTextColor="#666"
          secureTextEntry={true}
          onChangeText={(userPassword) => passwordValidation(userPassword)}
          onChangeText={(userPassword) => setPassword(userPassword)}
        />
      </View>

      <FormButton
        buttonTitle="Kaydol"
        onPress={() => register(email, password)}
      />

      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Facebook'la Giriş Yap"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => {}}
          />

          <SocialButton
            buttonTitle="Google'la Giriş Yap"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => {}}
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
    </View>
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
