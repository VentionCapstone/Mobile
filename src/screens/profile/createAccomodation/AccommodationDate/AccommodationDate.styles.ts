import { StyleSheet } from 'react-native';
import { PADDING_HORIZONTAL_12 } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL_12,
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
