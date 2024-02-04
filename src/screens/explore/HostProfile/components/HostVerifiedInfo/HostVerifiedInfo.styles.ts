import { StyleSheet } from 'react-native';
import { GREY_200, subtitle1, paragraph1 } from 'src/styles';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
    flex: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: GREY_200,
    padding: 20,
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 28,
  },
  title: {
    ...subtitle1,
    fontWeight: '700',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'column',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    ...paragraph1,
    marginLeft: 8,
  },
});

export default styles;
