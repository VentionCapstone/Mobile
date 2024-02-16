import { StyleSheet } from 'react-native';
import { paragraph3 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 5,
    paddingBottom: 30,
    marginTop: 30,
  },
  servicesTextContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  servicesText: {
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  signature: {
    ...paragraph3,
  },
});
