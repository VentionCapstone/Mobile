import { StyleSheet } from 'react-native';
import { WHITE_100, LEVEL_1 } from 'src/styles';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 80,
    padding: 16,
    position: 'absolute',
    zIndex: 1,
    top: 18,
    left: 0,
    right: 0,
  },
  icon: {
    flexDirection: 'row',
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE_100,
    ...LEVEL_1,
  },
});

export default styles;
