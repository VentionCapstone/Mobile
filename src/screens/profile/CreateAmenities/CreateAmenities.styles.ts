import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 50,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: 'grey',
    height: 90,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
  },
  emptySpace: {
    height: 20,
  },
  inputField: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderColor: 'black',
    height: 50,
    width: 310,
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
});
