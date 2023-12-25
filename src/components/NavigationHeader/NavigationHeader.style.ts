import { Platform, StyleSheet } from 'react-native';
import { title3 } from 'src/styles';
import { HORIZONTAL_12_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 120 : 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingHorizontal: HORIZONTAL_12_PERCENT,
  },
  leftContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  leftInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  title: {
    ...title3,
  },
  rightContainer: {
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
});
