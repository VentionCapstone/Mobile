import { StyleSheet } from 'react-native';
import { title2, title3, paragraph2 } from 'src/styles';
import { PADDING_HORIZONTAL_20 } from 'src/utils';

const styles = StyleSheet.create({
  emptyComponent: {
    paddingHorizontal: 10,
  },
  title: {
    ...title2,
  },
  description: {
    ...paragraph2,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: PADDING_HORIZONTAL_20,
  },
  container: {
    paddingHorizontal: PADDING_HORIZONTAL_20,
    flexDirection: 'row',
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
