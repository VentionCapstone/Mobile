import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  screenInnerContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});

export default styles;
