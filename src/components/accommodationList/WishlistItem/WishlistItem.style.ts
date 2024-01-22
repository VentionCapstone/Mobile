import { StyleSheet } from 'react-native';
import { LEVEL_1, paragraph3 } from 'src/styles';

export const styles = StyleSheet.create({
  card: {
    width: '45%',
    height: 220,
    backgroundColor: 'gray',
    borderRadius: 8,
    gap: 5,
    ...LEVEL_1,
  },
  imageContainer: {
    width: '100%',
    height: '65%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  imageLoader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  hidden: {
    display: 'none',
  },
  wishlistInfos: {
    flex: 1,
    padding: 6,
    justifyContent: 'space-between',
  },
  likeButton: {
    position: 'absolute',
    zIndex: 999,
    right: 0,
    padding: 10,
  },
  address: {
    ...paragraph3,
    fontWeight: '500',
  },
  price: {
    fontWeight: '500',
    fontSize: 14,
  },
  baseInfos: {
    fontSize: 10,
    textAlign: 'right',
  },
});
