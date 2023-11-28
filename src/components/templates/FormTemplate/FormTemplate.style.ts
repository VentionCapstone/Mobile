import { StyleSheet } from 'react-native';
import { FONT_SIZES, RED_200, RED_300 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  errorWrapper: {
    borderRadius: 8,
    minHeight: 60,
    backgroundColor: RED_300,
    padding: 10,
  },
  label: {
    fontWeight: '500',
    color: RED_200,
    fontSize: FONT_SIZES.LG,
  },
  errorMessage: {
    fontSize: FONT_SIZES.SM,
    color: RED_200,
  },
  errorIconWrapper: {
    flexDirection: 'row',
    gap: 4,
  },
});
