import { StyleSheet, Platform } from 'react-native';
import { WHITE_100 } from 'src/styles';

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImageWrapper: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  iconWrapper: {
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
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  label: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  radioLabel: {
    marginLeft: 8,
  },
  countrySelectorWrapper: {
    height: 50,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
  },
  textAreaStyles: {
    textAlignVertical: 'top',
  },
});
