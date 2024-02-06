import { StyleSheet } from 'react-native';
import { PADDING_HORIZONTAL_16 } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL_16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  redirectToLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  redirectToLoginText: {
    fontSize: 17,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});
