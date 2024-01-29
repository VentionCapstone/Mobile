import { StyleSheet } from 'react-native';
import { title1, title2, title3, LEVEL_1 } from 'src/styles';
import { PADDING_HORIZONTAL_12 } from 'src/utils';

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: PADDING_HORIZONTAL_12,
  },
  createAirBnbCard: {
    width: '95%',
    height: 180,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    ...LEVEL_1,
  },
  createAirBnbTitleContainer: {
    width: '60%',
  },
  createAirBnbTitle: {
    ...title2,
  },
  createAirBnbSubTitle: {
    ...title3,
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
  image: {
    width: 120,
    height: 100,
  },
});

export default styles;
