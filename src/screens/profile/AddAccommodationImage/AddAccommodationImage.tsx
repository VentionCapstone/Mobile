import { NavigationProp, useNavigation, Route } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Icon, Text, showAlert } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getAccommodationLoader, getColors } from 'src/store/selectors';
import { accommodationActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpenGallery = async () => {
    const result = await openImagePicker();

    if (result) {
      setSelectedImage(result);
    }
  };

  const handleOnSubmit = async () => {
    const imageData = {
      uri: selectedImage,
      name: 'image.jpg',
      type: 'image/jpeg',
    };

    await dispatch(
      AsyncThunks.addAccommodationImage({
        accommodationId,
        imageData,
      })
    );

    showAlert('success', {
      message: 'Accommodation created successfully!',
      onOkPressed: () => navigation.navigate('MyAccommodations'),
      //here goes amenities adding
    });
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
          <Text>Upload photo of accommodation(optional)</Text>
        </TouchableOpacity>

        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}

        <Button title="Submit" width="100%" onPress={handleOnSubmit} isLoading={loading} />
      </View>
    </ScreenTemplate>
  );
};

export default AddAccommodationImage;
