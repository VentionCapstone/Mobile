import { StyleSheet } from 'react-native';
import { paragraph1 } from 'src/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    ...paragraph1,
  },
});

export default styles;
