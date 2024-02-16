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
    marginTop: 40,
  },
  description: {
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
  },
  toggleText: {
    marginVertical: 20,
    fontSize: 14,
  },
  link: {
    marginVertical: 20,
    marginHorizontal: 5,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default styles;
