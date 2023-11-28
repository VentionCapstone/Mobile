import { StyleSheet } from 'react-native';
import { GREY_400 } from 'src/styles';

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
  languageItem: {
    padding: 15,
  },
  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  radioLabel: {
    marginLeft: 8,
    color: GREY_400,
  },
});
