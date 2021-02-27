import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

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
          backgroundColor: '#81ecec',
          image: (
            <Image
              source={require('../assets/onboarding/onboarding-img1.png')}
            />
          ),
          title: 'Onboarding 1',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fab1a0',
          image: (
            <Image
              source={require('../assets/onboarding/onboarding-img2.png')}
            />
          ),
          title: 'Onboarding 2',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#a29bfe',
          image: (
            <Image
              source={require('../assets/onboarding/onboarding-img3.png')}
            />
          ),
          title: 'Onboarding 3',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
    />
  );
};

export default OnboardingScreen;
