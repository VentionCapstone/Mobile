import { StyleSheet } from 'react-native';
import { title3 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    padding: 15,
  },
  noAccommodationsText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
  },
  createAccountContainer: {
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  createAccountTitle: {
    ...title3,
  },
});
