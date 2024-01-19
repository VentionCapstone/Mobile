import { StyleSheet } from 'react-native';
import { GREY_300, WHITE_200 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 480,
    marginVertical: 5,
    padding: 16,
  },
  imageContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE_200,
    height: '75%',
    borderRadius: 15,
  },
  bodyFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyContent: {
    padding: 10,
    gap: 3,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: { fontSize: 18 },
});
