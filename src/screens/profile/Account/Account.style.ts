import { StyleSheet } from 'react-native';
import { title1, title3, paragraph1 } from 'src/styles';
import { PADDING_HORIZONTAL_16, PADDING_HORIZONTAL_24 } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL_24,
  },
  redirectToCreateText: {
    ...title3,
  },
  redirectContainer: {
    paddingHorizontal: PADDING_HORIZONTAL_16,
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
