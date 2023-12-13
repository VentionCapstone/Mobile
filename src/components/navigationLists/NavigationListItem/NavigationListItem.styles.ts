import { StyleSheet } from 'react-native';
import { paragraph1 } from 'src/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  rightContainer: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    ...paragraph1,
  },
  leftIcon: {
    marginLeft: 10,
  },
});

export default styles;
