import { StyleSheet } from 'react-native';
import { RED_200, paragraph1, paragraph2, paragraph3 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  openDateButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderWidth: 1,
    marginTop: 5,
    gap: 5,
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
