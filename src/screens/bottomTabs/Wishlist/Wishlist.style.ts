import { StyleSheet } from 'react-native';
import { title1, title3, paragraph2 } from 'src/styles';
import { HORIZONTAL_20_PERCENT } from 'src/utils';

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
    paddingHorizontal: HORIZONTAL_20_PERCENT,
  },
  container: {
    paddingHorizontal: HORIZONTAL_20_PERCENT,
  },
  signInFirst: {
    ...title3,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default styles;
