import { StyleSheet } from 'react-native';
import { paragraph1 } from 'src/styles';

export const styles = StyleSheet.create({
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  selectedCountry: {
    ...paragraph1,
  },
  countryItem: {
    padding: 15,
    ...paragraph1,
  },
  optionText: {
    ...paragraph1,
  },
});
