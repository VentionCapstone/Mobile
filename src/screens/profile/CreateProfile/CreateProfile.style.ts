import { StyleSheet } from 'react-native';
import { FONT_SIZES } from 'src/styles';

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.XXL,
    fontWeight: '500',
  },
  label: {
    fontWeight: '500',
    marginTop: 20,
  },
  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: FONT_SIZES.SM,
  },
  countrySelectorWrapper: {
    height: 50,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
  },
  textAreaStyles: {
    textAlignVertical: 'top',
  },
});
