import { Platform, StyleSheet } from 'react-native';
import { GREY_500, WHITE } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginTop: Platform.OS === 'android' ? 30 : undefined,
  },
  modalHeader: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '101%',
  },
  headerText: {
    fontSize: 30,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  filterContainer: {
    flex: 2,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: WHITE,
    borderRadius: 20,
    gap: 5,
    width: '95%',
  },
  filterContentContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  input: {
    width: 140,
    height: 45,
    fontSize: 16,
  },
  darkColorBackground: {
    backgroundColor: GREY_500,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    borderTopWidth: 1,
    width: '100%',
  },
});
