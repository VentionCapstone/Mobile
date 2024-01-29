import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { PADDING_HORIZONTAL_12 } from 'src/utils';

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
    paddingHorizontal: PADDING_HORIZONTAL_12,
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
    paddingHorizontal: PADDING_HORIZONTAL_12,
    borderTopWidth: 1,
  },
});
