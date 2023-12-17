import { StyleSheet } from 'react-native';
import { RED_200, RED_300, paragraph1 } from 'src/styles';
import { HORIZONTAL_16_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_16_PERCENT,
    paddingVertical: 20,
    gap: 20,
    alignItems: 'center',
  },
  uploaderContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  errorContainer: {
    width: '100%',
    borderRadius: 8,
    minHeight: 60,
    marginTop: 20,
    backgroundColor: RED_300,
    padding: 10,
  },
  label: {
    fontWeight: '500',
    color: RED_200,
    ...paragraph1,
  },
  errorMessage: {
    color: RED_200,
    ...paragraph1,
  },
  errorIconContainer: {
    flexDirection: 'row',
    gap: 4,
  },
});
