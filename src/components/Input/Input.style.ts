import { StyleSheet, Platform } from 'react-native';
import { FONT_SIZES, RED_200 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    gap: 6,
  },
  label: {
    fontSize: FONT_SIZES.MD,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: Platform.OS === 'ios' ? 0.5 : 1,
  },
  input: {
    flex: 1,
    width: '100%',
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
  error: {
    borderColor: RED_200,
  },
  errorText: {
    color: RED_200,
    fontSize: FONT_SIZES.XS,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
});
