import { StyleSheet } from 'react-native';
import { title3 } from 'src/styles';
import { HORIZONTAL_12_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_12_PERCENT,
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '500',
  },
  subtitle: {
    ...title3,
    fontWeight: '300',
    marginBottom: 20,
  },
  titleInput: {
    textAlignVertical: 'top',
  },
});
