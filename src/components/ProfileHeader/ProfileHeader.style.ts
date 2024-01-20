import { StyleSheet } from 'react-native';
import { paragraph1, paragraph2, title3 } from 'src/styles';
import { HORIZONTAL_16_PERCENT } from 'src/utils';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_16_PERCENT,
    paddingVertical: 20,
  },
  header: {
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: '400',
  },
  notificationIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  subTitle: {
    ...paragraph1,
  },
  redirectAuthContainer: {
    gap: 20,
  },
  redirectAuthText: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
  },
  loggedInHeader: {
    height: 140,
    justifyContent: 'flex-end',
    gap: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountHeader: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
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
  accountName: {
    ...title3,
  },
  description: {
    ...paragraph2,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

export default styles;
