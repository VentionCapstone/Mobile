import { StyleSheet } from 'react-native';
import { WHITE_100, LEVEL_1, title1, paragraph1 } from 'src/styles';

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...title1,
  },
  description: {
    ...paragraph1,
  },
  profileImageContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    ...LEVEL_1,
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  addPhotoButton: {
    width: 120,
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE_100,
    padding: 6,
    gap: 10,
    borderRadius: 20,
    ...LEVEL_1,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  radioLabel: {
    marginLeft: 8,
  },
  textAreaStyles: {
    textAlignVertical: 'top',
  },
});
