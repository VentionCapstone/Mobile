import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { showAlert } from 'src/components';

const MAX_FILE_SIZE_MB = 5;

const getBase64FromURI = async (uri: string) => {
  try {
    const resizeResult = await manipulateAsync(uri, [], {
      format: SaveFormat.JPEG,
      base64: true,
    });

    if (resizeResult.base64) {
      const fileSizeInMB = resizeResult.base64.length / (4 * 1024 * 1024);

      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        showAlert('error', { message: `Image file size should be maximum ${MAX_FILE_SIZE_MB}mb` });
        return;
      }

      return resizeResult.base64;
    }
  } catch (error) {
    showAlert('error', { message: `Error resizing image: ${error}` });
  }
};

export { getBase64FromURI };
