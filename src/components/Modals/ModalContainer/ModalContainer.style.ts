import { StyleSheet } from 'react-native';
import { WHITE } from 'src/styles';

export const styles = StyleSheet.create({
  centralModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: WHITE,
    padding: 25,
    paddingVertical: 40,
    borderRadius: 15,
    width: '90%',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    padding: 10,
  },

  bottomModalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomModalContent: {
    backgroundColor: WHITE,
    padding: 10,
    paddingVertical: 20,
    borderRadius: 10,
    width: '100%',
    maxHeight: '95%',
  },
});
