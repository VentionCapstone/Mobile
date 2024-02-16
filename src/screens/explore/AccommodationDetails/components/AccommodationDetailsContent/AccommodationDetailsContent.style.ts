import { StyleSheet } from 'react-native';
import { paragraph2, title3 } from 'src/styles';

export const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 5,
  },
  address: {
    fontSize: 16,
  },
  headTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    ...paragraph2,
  },
  description: {
    ...title3,
    fontWeight: '500',
    marginTop: 10,
  },
});
