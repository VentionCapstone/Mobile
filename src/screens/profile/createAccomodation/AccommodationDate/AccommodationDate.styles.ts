import { StyleSheet } from 'react-native';
import { HORIZONTAL_12_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_12_PERCENT,
    paddingVertical: 10,
  },
  inputRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '500',
    marginBottom: 10,
  },
});
