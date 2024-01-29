import { StyleSheet } from 'react-native';
import { LEVEL_1, title2, paragraph1 } from 'src/styles';
import { PADDING_HORIZONTAL_12 } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: PADDING_HORIZONTAL_12,
  },
  imageContainer: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 100,
    overflow: 'hidden',
    ...LEVEL_1,
  },
  editButton: {
    width: '100%',
    height: 40,
    bottom: 0,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    gap: 4,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  saveButton: {
    minWidth: 100,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },
  title: {
    ...title2,
    marginTop: 20,
    fontWeight: '600',
    textAlign: 'left',
  },
  subTitle: {
    ...paragraph1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});
