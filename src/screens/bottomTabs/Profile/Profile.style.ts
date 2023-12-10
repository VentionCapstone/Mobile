import { StyleSheet } from 'react-native';
import { title1 } from 'src/styles';
import { HORIZONTAL_24_PERCENT } from 'src/utils/ui/ui.constants';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_24_PERCENT,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  labelText: {
    ...title1,
  },
});

export default styles;
