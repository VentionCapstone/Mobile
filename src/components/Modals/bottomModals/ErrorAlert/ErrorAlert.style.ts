import { StyleSheet } from 'react-native';
import { RED_100, RED_200, paragraph2, LEVEL_1 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    minWidth: '90%',
    minHeight: 60,
    justifyContent: 'flex-end',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    ...LEVEL_1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  title: {
    color: RED_200,
    fontSize: 16,
    fontWeight: '500',
  },
  message: {
    color: RED_100,
    ...paragraph2,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 4,
  },
});
