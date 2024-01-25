import { StyleSheet } from 'react-native';
import { LEVEL_1 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    padding: 20,
    fontSize: 24,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...LEVEL_1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  content: {
    padding: 10,
  },
});
