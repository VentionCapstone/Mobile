import { StyleSheet } from 'react-native';
import { GREY_200, subtitle1 } from 'src/styles';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    marginBottom: 50,
  },
  titleContainer: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  wrapper: {
    height: 380,
  },
  slide: {
    flex: 1,
    padding: 24,
  },
  dotContainer: {
    bottom: -20,
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: GREY_200,
  },
  accommodationImage: {
    padding: 0,
    width: '100%',
    aspectRatio: 4 / 3,
    objectFit: 'cover',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginTop: 10,
  },
  titleText: {
    ...subtitle1,
    marginBottom: 5,
    overflow: 'hidden',
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
