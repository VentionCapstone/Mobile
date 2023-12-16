import { StyleSheet } from 'react-native';
import { paragraph1, paragraph2, title3 } from 'src/styles';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
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
    ...paragraph1,
  },
  redirectAuthContainer: {
    gap: 20,
  },
  redirectAuthText: {
    gap: 20,
    flex: 1,
    flexDirection: 'row',
  },
  loggedInHeader: {
    height: 140,
    justifyContent: 'space-around',
    gap: 50,
  },
  titleContainer: {
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
  accountName: {
    ...title3,
  },
  description: {
    ...paragraph2,
  },
});

export default styles;
