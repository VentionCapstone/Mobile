import { StyleSheet } from 'react-native';
import { WHITE_100, LEVEL_1 } from 'src/styles';

export const styles = StyleSheet.create({
  profileImageWrapper: {
    width: 250,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    ...LEVEL_1,
  },
  profileImage: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 100,
  },
  addPhotoButton: {
    width: 120,
    backgroundColor: WHITE_100,
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 6,
    borderRadius: 20,
    ...LEVEL_1,
  },
});
