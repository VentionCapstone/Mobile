import { StyleSheet } from 'react-native';
import { WHITE_200, paragraph1 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    height: 480,
    marginVertical: 5,
    padding: 16,
    marginBottom: 15,
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
  },
  address: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  description: {
    ...paragraph1,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
