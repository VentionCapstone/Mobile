import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { title3 } from 'src/styles';
import { HORIZONTAL_12_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingHorizontal: HORIZONTAL_12_PERCENT,
    paddingTop: Constants.statusBarHeight,
  },
  leftContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  title: {
    ...title3,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
