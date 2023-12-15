import React, { useState } from 'react';
import { TouchableOpacity, View, Alert, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Icon, Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { useAppDispatch } from 'src/store';
import { getAccommodationError, getColors } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { RED_200 } from 'src/styles';
import { IconName } from 'src/types';

import { styles } from './AddAccommodationImage.style';
import { openImagePicker } from './AddAccommodationImage.utils';

const AddAccommodationImage = ({ route }: any) => {
  const { accommodationId } = route.params;

  const dispatch = useAppDispatch();
  const colors = useSelector(getColors);
  const imageError = useSelector(getAccommodationError);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpenGallery = async () => {
    const result = await openImagePicker();

    if (result) {
      setSelectedImage(result);
    }
  };

  const handleSaveImage = async () => {
    if (!selectedImage) {
      Alert.alert('Please select an image before saving.');
      return;
    }
    const imageData = {
      uri: selectedImage,
      name: 'image.jpg',
      type: 'image/jpeg',
    };

    await dispatch(AsyncThunks.uploadAccommodationImage({ accommodationId, imageData }));
  };

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
            <Text style={styles.errorMessage}>{imageError?.message}</Text>
          </View>
        )}

        <Button title="Save" onPress={handleSaveImage} width="100%" />
      </View>
    </ScreenTemplate>
  );
};

export default AddAccommodationImage;
