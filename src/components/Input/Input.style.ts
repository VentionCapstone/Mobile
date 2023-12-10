import { StyleSheet, Platform } from 'react-native';
import { paragraph3, title1, RED_200 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    gap: 6,
  },
  label: {
    ...title1,
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
    alignSelf: 'flex-start',
    marginLeft: 10,
    ...paragraph3,
  },
});
