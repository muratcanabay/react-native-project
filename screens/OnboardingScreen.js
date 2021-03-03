import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';

const Skip = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Atla</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Geç</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Tamamla</Text>
  </TouchableOpacity>
);

const Dots = ({selected}) => {
  let backgroundColor;
  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => {
        navigation.replace('Login');
      }}
      onDone={() => {
        navigation.replace('Login');
      }}
      pages={[
        {
          /* 1. Adım */
          backgroundColor: '#BFDCCF',
          image: (
            <View style={styles.container}>
              <LottieView
                style={{width: '100%'}}
                source={require('../assets/lottie/360-phone.json')}
                autoPlay
                loop
                width={250}
                height={250}
              />
            </View>
          ),
          title: (
            <Text style={styles.title}>
              Yüzünüzü video kaydı boyunca 360<Text>{'\u00b0'}</Text> açı ile
              çekin
            </Text>
          ),
          subtitle: (
            <Text style={styles.subtitle}>
              Farklı açılardan video kaydı model kalitenizi arttıracaktır
            </Text>
          ),
        },
        /* 2. Adım */
        {
          backgroundColor: '#F48FB1',
          image: (
            <View style={styles.container}>
              <LottieView
                style={{width: '100%'}}
                source={require('../assets/lottie/upload.json')}
                autoPlay
                loop
                width={250}
                height={250}
              />
            </View>
          ),
          title: <Text style={styles.title}>Videonuzu bizimle paylaşın</Text>,
          subtitle: (
            <Text style={styles.subtitle}>
              Videolarınız sadece yetkili kişiler tarafından erişilebilen{' '}
              <Text style={{color: '#1897FF'}}>Google Cloud</Text> Veritabanında
              saklanmaktadır
            </Text>
          ),
        },
        /* 3. Adım */
        {
          backgroundColor: '#FFF59D',
          image: (
            <View style={styles.container}>
              <LottieView
                style={{width: '100%'}}
                source={require('../assets/lottie/cargo.json')}
                autoPlay
                loop
                width={250}
                height={250}
              />
            </View>
          ),
          title: (
            <Text style={styles.title}>Siparişiniz hemen teslim edilsin</Text>
          ),
          subtitle: (
            <Text style={styles.subtitle}>
              Siparişiniz ödeme yaptıktan sonra 1 hafta içinde teslim
              edilecektir
            </Text>
          ),
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 70,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#32384D',
  },
});
