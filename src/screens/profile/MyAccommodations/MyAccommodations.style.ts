import { StyleSheet } from 'react-native';
import { title3 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    paddingVertical: 10,
    alignItems: 'center',
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
  loader: {
    marginTop: 10,
  },
  createAccountTitle: {
    ...title3,
  },
});
