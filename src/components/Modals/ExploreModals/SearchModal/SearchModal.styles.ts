import { StyleSheet } from 'react-native';
import { LEVEL_1, title2 } from 'src/styles';
import { HORIZONTAL_12_PERCENT, HORIZONTAL_20_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_12_PERCENT,
    height: '100%',
    paddingBottom: 50,
  },
  headerTitle: {
    ...title2,
    padding: 20,
  },
  inputsContainer: {
    alignItems: 'center',
    gap: 20,
  },
  where: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    paddingHorizontal: HORIZONTAL_20_PERCENT,
    paddingVertical: 20,
    zIndex: 999,
    gap: 30,
    ...LEVEL_1,
  },
  whereTitle: {
    ...title2,
  },
  closeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...LEVEL_1,
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: HORIZONTAL_12_PERCENT,
  },
});
