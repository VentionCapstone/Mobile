import { StyleSheet } from 'react-native';
import { FONT_SIZES } from 'src/styles';
import { HORIZONTAL_24_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_24_PERCENT,
  },
  card: {
    height: 70,
    gap: 5,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: FONT_SIZES.XXL,
    fontWeight: '500',
  },
  label: {
    fontWeight: '400',
  },
  value: {
    fontSize: FONT_SIZES.SM,
    fontWeight: '300',
  },
  rightComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingBottom: 2,
  },
  edit: {
    textDecorationLine: 'underline',
    fontSize: FONT_SIZES.LG,
  },
});
