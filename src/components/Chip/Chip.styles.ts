import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    height: 50,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: 'white',
    paddingLeft: 15,
    marginBottom: 10,
    gap: 15,
  },
  chipAdded: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    height: 50,
    backgroundColor: '#EEFFFF',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#00c1b2',
    paddingLeft: 15,
    marginBottom: 10,
    gap: 15,
  },
  chipFont: {
    fontSize: 16,
  },
  iconRemove: {
    marginBottom: 10,
  },
  iconAdd: {
    marginBottom: 10,
    color: '#00c1b2',
  },
});
