import * as ImagePicker from 'expo-image-picker';
import { showToast } from 'src/components';

export const pickImage = async (): Promise<ImagePicker.ImagePickerAsset | null> => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      showToast({ type: 'error', text1: 'Permission to access image library denied!' });
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.canceled) return null;

    return result.assets[0];
  } catch (error) {
    showToast({ type: 'error', text1: `Error picking image ${error}` });
    return null;
  }
};
