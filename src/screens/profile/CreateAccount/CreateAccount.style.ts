import { StyleSheet } from 'react-native';
import { title1, title3, paragraph1 } from 'src/styles';

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...title1,
  },
  description: {
    ...paragraph1,
  },
  label: {
    ...title3,
    marginTop: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  countrySelectorContainer: {
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
