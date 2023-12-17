import { StyleSheet } from 'react-native';
import { title1, title2, paragraph1 } from 'src/styles';
import { HORIZONTAL_16_PERCENT, HORIZONTAL_24_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_24_PERCENT,
  },
  redirectToCreateText: {
    ...title2,
  },
  redirectContainer: {
    paddingHorizontal: HORIZONTAL_16_PERCENT,
    paddingVertical: 20,
    gap: 30,
    alignItems: 'center',
  },
  card: {
    height: 70,
    gap: 5,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  label: {
    fontWeight: '400',
  },
  value: {
    ...paragraph1,
  },
  rightComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingBottom: 2,
  },
  edit: {
    textDecorationLine: 'underline',
    ...title1,
  },
});
