import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    borderTopWidth: 1,
    flexDirection: 'row',
    borderColor: 'grey',
    height: 90,
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: 20,
  },
  emptySpace: {
    height: 35,
  },
  inputField: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderColor: 'black',
    height: 50,
    width: 350,
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 10,
    marginVertical: 3,
    gap: 20,
    borderRadius: 15,
    borderWidth: 1,
  },
  inputText: {
    fontSize: 16,
    height: '100%',
    width: 180,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
  },
});
