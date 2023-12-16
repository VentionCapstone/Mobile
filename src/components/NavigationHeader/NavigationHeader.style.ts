import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { title3 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingTop: Constants.statusBarHeight,
  },
  leftContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    ...title3,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
