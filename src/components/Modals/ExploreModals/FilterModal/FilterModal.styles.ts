import { StyleSheet } from 'react-native';
import { title1, title2, LEVEL_1 } from 'src/styles';
import { HORIZONTAL_12_PERCENT, HORIZONTAL_16_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_12_PERCENT,
    paddingVertical: 20,
    gap: 20,
  },
  headerText: {
    ...title1,
    marginTop: 10,
    marginLeft: 20,
  },
  filterContainer: {
    paddingVertical: 15,
    borderRadius: 10,
    paddingHorizontal: HORIZONTAL_16_PERCENT,
    ...LEVEL_1,
  },
  filterTitle: {
    ...title2,
    fontWeight: '400',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numericInput: {
    width: 150,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: HORIZONTAL_12_PERCENT,
    paddingVertical: 10,
  },
});
