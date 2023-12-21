import { StyleSheet } from 'react-native';
import { RED_200, RED_300, paragraph1 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  errorContainer: {
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
