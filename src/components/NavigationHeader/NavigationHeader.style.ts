import Constants from 'expo-constants';
import { Platform, StyleSheet } from 'react-native';
import { title3, LEVEL_1 } from 'src/styles';
import { PADDING_HORIZONTAL_12 } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: Platform.OS === 'ios' ? 120 : 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL_12,
    ...LEVEL_1,
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
    ...title3,
  },
  rightContainer: {
    justifyContent: 'flex-end',
  },
});
