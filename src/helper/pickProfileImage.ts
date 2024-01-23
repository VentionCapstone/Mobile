import * as ImagePicker from 'expo-image-picker';
import { showAlert } from 'src/components';
import { ImageDataType } from 'src/types';

export const pickImage = async (): Promise<ImagePicker.ImagePickerAsset | null> => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.canceled) return null;

    return result.assets[0];
  } catch (error) {
    showAlert('error', { message: `Error picking image:, ${error}` });
    return null;
  }
};
