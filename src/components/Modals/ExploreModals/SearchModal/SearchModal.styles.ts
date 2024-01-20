import { StyleSheet } from 'react-native';
import { GREY_300 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GREY_300,
  },
  icon: {
    borderRadius: 100,
    borderWidth: 0.5,
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePicker: {
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
