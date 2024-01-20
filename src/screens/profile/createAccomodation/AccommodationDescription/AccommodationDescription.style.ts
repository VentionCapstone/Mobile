import { StyleSheet } from 'react-native';
import { title3 } from 'src/styles';
import { HORIZONTAL_12_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_12_PERCENT,
  },
  title: {
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '500',
  },
  subtitle: {
    marginBottom: 10,
    ...title3,
  },
  descriptionInput: {
    textAlignVertical: 'top',
  },
});
