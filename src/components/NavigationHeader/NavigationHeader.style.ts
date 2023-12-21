import { Platform, StyleSheet } from 'react-native';
import { title2 } from 'src/styles';
import { HORIZONTAL_12_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingHorizontal: HORIZONTAL_12_PERCENT,
  },
  leftContainer: {
    height: Platform.OS === 'ios' ? 90 : 60,
    justifyContent: 'flex-end',
  },
  leftInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 10,
  },
  title: {
    ...title2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
