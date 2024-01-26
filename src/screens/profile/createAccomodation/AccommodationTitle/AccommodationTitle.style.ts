import { StyleSheet } from 'react-native';
import { title3 } from 'src/styles';
import { PADDING_HORIZONTAL_12 } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL_12,
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
