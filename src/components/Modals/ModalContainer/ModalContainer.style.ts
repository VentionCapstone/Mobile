import { StyleSheet } from 'react-native';
import { WHITE, LEVEL_1, title3 } from 'src/styles';

export const styles = StyleSheet.create({
  centralModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 6,
    gap: 10,
  },
  title: {
    ...title3,
    fontWeight: '400',
    fontSize: 19,
  },
  modalContent: {
    backgroundColor: WHITE,
    padding: 10,
    paddingVertical: 20,
    borderRadius: 15,
    width: '90%',
  },
  closeButton: {
    width: 35,
    height: 35,
    marginLeft: 15,
    borderRadius: 20,
    marginBottom: 10,
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
    paddingVertical: 20,
    borderRadius: 10,
    width: '100%',
    maxHeight: '95%',
  },
});
