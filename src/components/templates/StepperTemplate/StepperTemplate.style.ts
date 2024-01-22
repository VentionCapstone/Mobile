import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { LEVEL_1 } from 'src/styles';
import { HORIZONTAL_12_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: HORIZONTAL_12_PERCENT,
  },
  innerContainer: {
    height: '80%',
  },
  buttonsContainer: {
    position: 'absolute',
    height: 80,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: HORIZONTAL_12_PERCENT,
    borderTopWidth: 1,
  },
});
