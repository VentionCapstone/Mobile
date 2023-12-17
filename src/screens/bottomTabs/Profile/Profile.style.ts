import { StyleSheet } from 'react-native';
import { title1 } from 'src/styles';

const styles = StyleSheet.create({
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
  logoutButton: {
    marginLeft: 10,
  },
});

export default styles;
