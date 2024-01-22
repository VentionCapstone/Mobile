import { StyleSheet } from 'react-native';
import { GREY_300, title1, title2, title3, paragraph2, LEVEL_1 } from 'src/styles';
import { HORIZONTAL_12_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  uploaderContainer: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    ...LEVEL_1,
  },
  titleContainer: {
    paddingHorizontal: HORIZONTAL_12_PERCENT,
  },
  title: {
    ...title1,
  },
  subTitle: {
    marginTop: 5,
    ...title3,
  },
  addButtonTitle: {
    ...title2,
    fontSize: 18,
  },
  uploadTitle: {
    ...title2,
  },
  uploadText: {
    textDecorationLine: 'underline',
    top: 30,
    ...paragraph2,
  },
  imagesContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20,
  },
  imagePickerContainer: {
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageContainer: {
    width: 350,
    height: 250,
    margin: 5,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: GREY_300,
    borderRadius: 10,
    padding: 6,
  },
  addButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: HORIZONTAL_12_PERCENT,
  },
  addButton: {
    borderRadius: 30,
  },
});
