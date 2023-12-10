import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { title2 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
  },
  leftContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    ...title2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
