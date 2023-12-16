import { StyleSheet } from 'react-native';
import { paragraph1 } from 'src/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  rightContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  label: {
    ...paragraph1,
  },
  leftIconContainer: {
    width: '10%',
    alignItems: 'flex-end',
  },
  leftIcon: {
    marginLeft: 20,
  },
});

export default styles;
