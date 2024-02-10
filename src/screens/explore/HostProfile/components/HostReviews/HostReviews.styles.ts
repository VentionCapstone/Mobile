import { StyleSheet } from 'react-native';
import { GREY_200, subtitle1, paragraph1, paragraph2 } from 'src/styles';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    marginBottom: 20,
  },
  wrapper: {
    height: 210,
  },
  slide: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    bottom: -20,
  },
  titleContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  title: {
    ...subtitle1,
    fontWeight: 'bold',
  },
  reviewContainer: {
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: GREY_200,
    padding: 20,
  },
  reviewContent: {
    marginBottom: 15,
  },
  reviewText: {
    ...paragraph1,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfoText: {
    flexDirection: 'column',
  },
  userName: {
    ...paragraph1,
    fontWeight: 'bold',
  },
  joinedDate: {
    ...paragraph2,
  },
});

export default styles;
