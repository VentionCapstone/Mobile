import { StyleSheet } from 'react-native';
import { title2, paragraph1 } from 'src/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  sectionTitle: {
    ...title2,
    alignSelf: 'flex-end',
    marginRight: 280,
  },
  titleContainer: {
    backgroundColor: 'red',
    alignSelf: 'flex-start',
  },
  label: {
    ...paragraph1,
  },
});

export default styles;
