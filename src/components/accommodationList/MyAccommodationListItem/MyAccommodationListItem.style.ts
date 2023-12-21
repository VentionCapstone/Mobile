import { StyleSheet } from 'react-native';
import { paragraph1 } from 'src/styles';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    height: 100,
    maxHeight: 140,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
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
  city: {
    ...paragraph1,
  },
  country: {
    ...paragraph1,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    borderRadius: 5,
    padding: 4,
    marginHorizontal: 4,
  },
});
