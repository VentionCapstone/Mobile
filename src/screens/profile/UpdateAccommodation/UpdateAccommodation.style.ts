import { StyleSheet } from 'react-native';
import { paragraph1, title1 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...title1,
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
  inputColumn: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  availabilityText: {
    fontSize: 16,
  },
  addressLabel: {
    ...paragraph1,
  },
});
