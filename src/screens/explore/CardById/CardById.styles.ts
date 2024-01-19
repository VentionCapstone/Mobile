import { StyleSheet } from 'react-native';
import { BLACK, WHITE } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    opacity: 0,
    width: 400,
  },
  icon: {
    borderRadius: 100,
    borderWidth: 0.5,
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: BLACK,
  },
});
