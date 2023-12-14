import { StyleSheet } from 'react-native';
import { paragraph1 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    textAlignVertical: 'top',
  },
  checkButtonWrapper: {
    height: 60,
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
  },
  availabilityText: {
    fontSize: 16,
  },
  addressLabel: {
    ...paragraph1,
  },
});
