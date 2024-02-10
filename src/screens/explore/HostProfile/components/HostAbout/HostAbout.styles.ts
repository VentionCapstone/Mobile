import { StyleSheet } from 'react-native';
import { paragraph1 } from 'src/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  infoText: {
    ...paragraph1,
    marginLeft: 8,
  },
  description: {
    ...paragraph1,
    fontWeight: '500',
  },
});

export default styles;
