import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { FONT_SIZES } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingTop: Constants.statusBarHeight,
  },
  leftContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: FONT_SIZES.XL,
    fontWeight: '500',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
