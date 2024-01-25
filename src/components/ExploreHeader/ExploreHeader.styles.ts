import { StyleSheet } from 'react-native';
import { LEVEL_1 } from 'src/styles';
import { HORIZONTAL_20_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
    gap: 10,
  },
  searchBarInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    width: '75%',
    paddingHorizontal: HORIZONTAL_20_PERCENT,
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
