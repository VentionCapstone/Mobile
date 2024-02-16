import { StyleSheet } from 'react-native';
import { LEVEL_1 } from 'src/styles';
import { PADDING_HORIZONTAL_20 } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  searchBarInput: {
    width: '75%',
    padding: 8,
    paddingHorizontal: PADDING_HORIZONTAL_20,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
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
    height: 40,
    width: 40,
    marginVertical: 10,
    borderRadius: 100,
    ...LEVEL_1,
  },
});
