import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 40,
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
  },
  searchModalFooter: {
      height: 85,
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      width: '100%',
      padding: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
  }
});
