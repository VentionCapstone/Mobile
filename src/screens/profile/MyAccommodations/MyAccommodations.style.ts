import { StyleSheet } from 'react-native';
import { title3 } from 'src/styles';
import { PADDING_HORIZONTAL_16 } from 'src/utils';

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
  redirectToCreateText: {
    ...title3,
  },
  redirectContainer: {
    paddingHorizontal: PADDING_HORIZONTAL_16,
    paddingTop: 20,
    gap: 10,
    alignItems: 'center',
  },
  loader: {
    marginTop: 10,
  },
  createAccountTitle: {
    ...title3,
  },
});
