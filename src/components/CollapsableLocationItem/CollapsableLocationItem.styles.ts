import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 15,
    padding: 5,
    justifyContent: 'flex-end',
    textAlign:'right'
  },
  searchInput: {
    width: '100%',
    borderRadius: 15,
    height: 40,
    fontSize: 18,
  },
  placesInputListView: {
    width: '100%',
    zIndex: 999,
    maxHeight: 400,
  }
});
