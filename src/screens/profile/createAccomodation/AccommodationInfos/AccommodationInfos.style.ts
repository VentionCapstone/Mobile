import { StyleSheet } from 'react-native';
import { title1, title3 } from 'src/styles';
import { HORIZONTAL_12_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: HORIZONTAL_12_PERCENT,
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
    lineHeight: 30,
    marginBottom: 5,
    ...title1,
  },
  subtitle: {
    marginBottom: 10,
    ...title3,
  },
  counterContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  counterTitle: {
    ...title3,
    marginRight: 10,
    fontWeight: '500',
  },
  counterButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  counterButton: {
    width: 35,
    height: 35,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  counterText: {
    fontSize: 22,
    fontWeight: '300',
  },
  inputsContainer: {
    marginTop: 20,
  },
  textArea: {
    textAlignVertical: 'top',
  },
});
