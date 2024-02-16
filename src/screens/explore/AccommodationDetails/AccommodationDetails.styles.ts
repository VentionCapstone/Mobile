import { StyleSheet } from 'react-native';
import { GREY_300, LEVEL_1 } from 'src/styles';
import { PADDING_HORIZONTAL_20 } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: PADDING_HORIZONTAL_20,
    paddingVertical: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    top: 8,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
  icon: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    ...LEVEL_1,
  },
  imagePlaceholder: {
    height: 250,
    width: '100%',
    backgroundColor: GREY_300,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    height: 80,
  },
});
