import { StyleSheet } from 'react-native';
import { LEVEL_1 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    minHeight: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderBottomWidth: 6,
    marginTop: 20,
    ...LEVEL_1,
  },
  messageContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  message: {
    fontSize: 12,
    fontWeight: '300',
  },
  closeButton: {},
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
