import { StyleSheet } from 'react-native';
import { paragraph2 } from 'src/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  rightContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  label: {
    ...paragraph2,
  },
  leftIconContainer: {
    width: '10%',
    alignItems: 'flex-end',
  },
});

export default styles;
