import { StyleSheet } from 'react-native';
import { RED_200, paragraph1, paragraph2, paragraph3 } from 'src/styles';

export const styles = StyleSheet.create({
  openDateButton: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    marginTop: 5,
  },
  labelText: {
    ...paragraph1,
  },
  placeholder: {
    ...paragraph2,
  },
  errorText: {
    color: RED_200,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 4,
    ...paragraph3,
  },
});
