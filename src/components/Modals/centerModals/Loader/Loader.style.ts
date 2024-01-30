import { StyleSheet } from 'react-native';
import { title3 } from 'src/styles';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loaderContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  loaderMessage: {
    ...title3,
    fontWeight: '500',
    textAlign: 'center',
  },
});
