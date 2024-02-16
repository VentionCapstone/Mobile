import { StyleSheet } from 'react-native';
import { LEVEL_1, title3 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    padding: 20,
    fontSize: 24,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    ...LEVEL_1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subtitle: {
    ...title3,
    fontSize: 14,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  content: {
    padding: 10,
  },
});
