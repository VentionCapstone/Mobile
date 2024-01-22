import Constants from 'expo-constants';
import { Platform, StyleSheet } from 'react-native';
import { LEVEL_2, title2 } from 'src/styles';
import { HORIZONTAL_12_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: Platform.OS === 'ios' ? 120 : 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: HORIZONTAL_12_PERCENT,
    ...LEVEL_2,
  },
  leftContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  leftInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    ...title2,
  },
  rightContainer: {
    justifyContent: 'flex-end',
  },
});
