import { StyleSheet } from 'react-native';
import { LEVEL_1 } from 'src/styles';
import { PADDING_HORIZONTAL_20 } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  searchBarInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    width: '75%',
    paddingHorizontal: PADDING_HORIZONTAL_20,
    borderRadius: 40,
    ...LEVEL_1,
  },
  searchContent: {
    justifyContent: 'flex-start',
    gap: 3,
  },
  searchHeader: {
    fontWeight: 'bold',
  },
  filter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    marginVertical: 10,
    border: 'solid',
    borderRadius: 100,
    ...LEVEL_1,
  },
});
