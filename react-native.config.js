module.exports = {
  project: {
    ios: {},
    android: {},
  },
  // For IOS, Facebook and Google Login was hidden. So these packages are excluded for IOS.
  dependencies: {
    '@react-native-community/google-signin': {
      platforms: {
        ios: null,
      },
    },
    'react-native-fbsdk': {
      platforms: {
        ios: null,
      },
    },
  },
  assets: ['./assets/fonts/'],
};
