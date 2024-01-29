import { StyleSheet } from 'react-native';
import { title1, title3, paragraph2 } from 'src/styles';
import { PADDING_HORIZONTAL_20 } from 'src/utils';

const styles = StyleSheet.create({
  emptyComponent: {
    padding: 12,
  },
  title: {
    ...title1,
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
  },
  signInFirst: {
    ...title3,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default styles;
