import { StyleSheet } from 'react-native';
import { paragraph1, WHITE } from 'src/styles';

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
    paddingVertical: 35,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 6,
    padding: 4,
  },
  closeButtonText: {
    color: 'blue',
    ...paragraph1,
  },

  bottomModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomModalContent: {
    backgroundColor: WHITE,
    padding: 25,
    paddingVertical: 35,
    borderRadius: 10,
    width: '100%',
    maxHeight: '80%',
  },
});
