import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    height: 50,
    color: 'black',
  },
  head: {
    fontSize: 35,
    marginBottom: 20,
    marginTop: 40,
  },
  description: {
    fontSize: 15,
    marginVertical: 20,
  },
  toggleText: {
    marginVertical: 20,
    fontSize: 15,
  },
  link: {
    marginVertical: 20,
    marginHorizontal: 5,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

export default styles;
