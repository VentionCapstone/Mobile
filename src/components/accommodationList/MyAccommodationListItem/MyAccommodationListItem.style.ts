import { StyleSheet } from 'react-native';
import { title3 } from 'src/styles';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    flex: 1,
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  descriptionContainer: {
    flex: 2,
    padding: 10,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    ...title3,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    fontSize: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
});
