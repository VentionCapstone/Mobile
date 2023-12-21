import * as ImagePicker from 'expo-image-picker';
import { showAlert } from 'src/components';

export const openImagePicker = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    showAlert('error', {
      message: 'Permission to access media library was denied',
    });
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  return result.canceled ? null : result.assets[0].uri;
};
