import { StyleSheet } from 'react-native';
import { RED_200, paragraph3, paragraph1 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  phoneInputContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 5,
  },
  label: {
    ...paragraph1,
  },
  phoneInputText: {
    fontSize: 16,
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 8,
  },
  flagButton: {
    width: 25,
    height: 20,
    borderRadius: 8,
  },
  errorText: {
    color: RED_200,
    alignSelf: 'flex-start',
    marginLeft: 10,
    ...paragraph3,
  },
});
