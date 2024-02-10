import { StyleSheet } from 'react-native';
import { title2, title3, paragraph2 } from 'src/styles';
import { PADDING_HORIZONTAL_20 } from 'src/utils';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL_20,
    flexDirection: 'row',
  },
  emptyComponent: {
    paddingHorizontal: PADDING_HORIZONTAL_20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: PADDING_HORIZONTAL_20,
  },
  title: {
    ...title2,
  },
  description: {
    ...paragraph2,
  },
  signInFirst: {
    ...title3,
    marginRight: 6,
    textAlign: 'center',
  },
  signInFirstButtonText: {
    textDecorationLine: 'underline',
  },
});

export default styles;
