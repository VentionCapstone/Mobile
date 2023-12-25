import { StyleSheet } from 'react-native';
import { title2, paragraph1 } from 'src/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
  },
  sectionTitle: {
    ...title2,
    marginLeft: 20,
    marginBottom: 10,
  },
  label: {
    ...paragraph1,
  },
});

export default styles;
