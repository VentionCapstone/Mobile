import { StyleSheet } from 'react-native';
import { HORIZONTAL_24_PERCENT } from 'src/utils/ui/ui.constants';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_24_PERCENT,
  },
  sectionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  sectionLeftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
