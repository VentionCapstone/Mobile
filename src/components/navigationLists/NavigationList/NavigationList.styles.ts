import { StyleSheet } from 'react-native';
import { title2, paragraph1 } from 'src/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    ...title2,
  },
  label: {
    ...paragraph1,
  },
});

export default styles;
