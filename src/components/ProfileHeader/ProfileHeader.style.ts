import { StyleSheet } from 'react-native';
import { FONT_SIZES } from 'src/styles';

const styles = StyleSheet.create({
  header: {
    height: 280,
    justifyContent: 'center',
    gap: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
  },
  subTitle: {
    fontSize: FONT_SIZES.LG,
    fontWeight: '300',
  },
  redirectAuthWrapper: {
    gap: 20,
  },
  redirectAuthTextWrapper: {
    flexDirection: 'row',
    gap: 2,
  },

  loggedInHeader: {
    height: 140,
    justifyContent: 'space-around',
    gap: 50,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 30,
  },
  accountHeaderContents: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fullname: {
    fontWeight: '500',
    fontSize: FONT_SIZES.MD,
  },
  description: {
    fontSize: FONT_SIZES.SM,
    fontWeight: '300',
  },
});

export default styles;
