import { StyleSheet } from 'react-native';
import { WHITE, LEVEL_1 } from 'src/styles';

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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...LEVEL_1,
  },

  bottomModalContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
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
