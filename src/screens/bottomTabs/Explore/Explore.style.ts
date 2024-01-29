import { StyleSheet } from 'react-native';
import { title3 } from 'src/styles';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  loading: {
    marginVertical: 20,
  },
  emptySpace: {
    height: 80,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    ...title3,
    marginTop: 10,
  },
});

export default styles;
