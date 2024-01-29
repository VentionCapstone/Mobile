import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  searchInput: {
    width: '100%',
    paddingLeft: 40,
    borderRadius: 30,
  },
  placesInputListView: {
    position: 'absolute',
    width: '100%',
    maxHeight: 400,
    zIndex: 999,
    top: 60,
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 999,
    left: 10,
    top: 8,
  },
});
