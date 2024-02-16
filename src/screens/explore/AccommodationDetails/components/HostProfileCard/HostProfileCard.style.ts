import { StyleSheet } from 'react-native';
import { LEVEL_1 } from 'src/styles';

export const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    gap: 30,
    ...LEVEL_1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
