import Constants from 'expo-constants';
import { Platform, StyleSheet } from 'react-native';
import { LEVEL_1 } from 'src/styles';
import { PADDING_HORIZONTAL_12 } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: Platform.OS === 'ios' ? 120 : 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING_HORIZONTAL_12,
    paddingBottom: 10,
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
    fontSize: 18,
    fontWeight: '400',
  },
  rightContainer: {
    justifyContent: 'flex-end',
  },
});
