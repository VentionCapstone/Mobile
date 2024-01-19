import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 50,
  },
  emptySpace: {
    height: 35,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  inputField: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderColor: 'black',
    height: 50,
    width: '90%',
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 10,
    marginVertical: 3,
    marginHorizontal: 10,
    gap: 20,
    borderRadius: 15,
    borderWidth: 1,
  },
  inputText: {
    fontSize: 16,
    height: '100%',
    width: 180,
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
  errorBox: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 5,
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  errorText: {
    fontSize: 16,
  },
});
