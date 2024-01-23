import { StyleSheet } from 'react-native';
import { GREY_300 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GREY_300,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 15,
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
