import { NavigationProp, useNavigation, Route } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Icon, Text, showAlert } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getAccommodationError, getAccommodationLoader, getColors } from 'src/store/selectors';
import { accommodationActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { RED_200 } from 'src/styles';
import { IconName } from 'src/types';

import { styles } from './AddAccommodationImage.style';
import { openImagePicker } from './AddAccommodationImage.utils';

interface Props {
  route: Route<'AddAccommodationImage', { accommodationId: string }>;
}

const AddAccommodationImage = ({ route }: Props) => {
  const { accommodationId } = route.params;

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const colors = useSelector(getColors);
  const loading = useSelector(getAccommodationLoader);
  const imageError = useSelector(getAccommodationError);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpenGallery = async () => {
    const result = await openImagePicker();

    if (result) {
      setSelectedImage(result);
    }
  };

  const handleSaveImage = async () => {
    const imageData = {
      uri: selectedImage,
      name: 'image.jpg',
      type: 'image/jpeg',
    };

    const response = await dispatch(
      AsyncThunks.addAccommodationImage({
        accommodationId,
        imageData,
      })
    );

    if (response.payload?.success) {
      showAlert('success', {
        message: 'Accommodation created successfully!',
        onOkPressed: () => navigation.navigate('MyAccommodations'),
      });
    } else {
      showAlert('error', {
        message: 'Image upload failed. Please try again.',
      });
    }
  };

  useEffect(() => {
    dispatch(accommodationActions.clearError());
  }, []);

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.uploaderContainer, { borderColor: colors.border }]}
          onPress={handleOpenGallery}
        >
          <Icon name={IconName.CameraOutline} size={40} />
          <Text>Upload photo of accommodation</Text>
        </TouchableOpacity>

        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}

        {imageError && (
          <View style={[styles.errorContainer, { backgroundColor: colors.errorBackground }]}>
            <View style={styles.errorIconContainer}>
              <Icon name={IconName.Error} iconSet="material" color={RED_200} size={20} />
              <Text style={styles.label}>Error!</Text>
            </View>
            <Text style={styles.errorMessage}>{imageError?.error.message}</Text>
          </View>
        )}

        <Button
          title="Save"
          width="100%"
          onPress={handleSaveImage}
          isLoading={loading}
          disabled={!selectedImage}
        />
      </View>
    </ScreenTemplate>
  );
};

export default AddAccommodationImage;
