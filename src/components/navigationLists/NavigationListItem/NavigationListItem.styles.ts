import { StyleSheet } from 'react-native';
import { paragraph2 } from 'src/styles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 4,
    borderBottomWidth: 1,
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
