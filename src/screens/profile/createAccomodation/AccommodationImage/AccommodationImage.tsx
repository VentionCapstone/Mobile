import { NavigationProp, useNavigation, Route } from '@react-navigation/native';
import { Asset, ImagePicker } from 'expo-image-multiple-picker';
import { useEffect, useState } from 'react';
import { TouchableOpacity, Image, View, ScrollView, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, ButtonType, Icon, Loader, Text, showAlert } from 'src/components';
import { StepperTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getAccommodationLoader, getColors } from 'src/store/selectors';
import { accommodationActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { BUTTON_SIZES, GREY_400, WHITE } from 'src/styles';
import { IconName } from 'src/types';

import { styles } from './AccommodationImage.style';
import { getBase64FromURI } from './AddAccommodationImage.utils';

type ImageProps = {
  filename: string;
  uri: string;
  base64Image: string | undefined;
};

type Props = {
  route: Route<'AccommodationImage', { accommodationId: string }>;
};

const AccommodationImage = ({ route }: Props) => {
  const { accommodationId } = route.params;

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const colors = useSelector(getColors);
  const loader = useSelector(getAccommodationLoader);
  const { width } = useWindowDimensions();
  const [openPicker, setOpenPicker] = useState<boolean>(false);
  const [isConvertingtoBase64, setIsConvertingtoBase64] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<ImageProps[]>([]);

  const handleOpenGallery = async () => {
    setOpenPicker(true);
  };

  const handleSaveImages = async (assets: Asset[]) => {
    dispatch(accommodationActions.clearError());

    const images = assets.map(async (asset) => {
      const base64 = await getBase64FromURI(asset.uri);
      return {
        filename: asset.filename,
        uri: asset.uri,
        base64Image: base64,
      };
    });

    setIsConvertingtoBase64(true);
    Promise.all(images).then((processedImages) => {
      setSelectedImages((prevImages) => [...prevImages, ...processedImages]);
      setOpenPicker(false);
      setIsConvertingtoBase64(false);
    });
  };

  const handleDeleteImage = (index: number) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);

      return updatedImages;
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    selectedImages.forEach((image, index) => {
      formData.append(`images`, {
        uri: image.uri,
        name: 'media',
        type: `image/${'jpeg'}`,
      } as any);
    });

    const response = await dispatch(
      AsyncThunks.uploadAccommodationImages({
        formData,
        accommodationId,
      })
    );

    if (response.payload.success) {
      navigation.navigate('MyAccommodations');
    }
  };

  useEffect(() => {
    dispatch(accommodationActions.clearError());
  }, []);

  const isNextButtonDisabled = selectedImages.length < 5;

  return (
    <StepperTemplate
      onNext={handleSubmit}
      nextButtonTitle="finish"
      disableNextButton={isNextButtonDisabled}
      loader={loader}
    >
      <ScrollView contentContainerStyle={styles.imagesContainer}>
        {!selectedImages.length && (
          <>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Add some photos of your house</Text>
              <Text style={styles.subTitle}>
                You'll need 5 photos to get started, You can add more and make changes later.
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.uploaderContainer, { borderColor: colors.buttonBorder }]}
              onPress={handleOpenGallery}
            >
              <Icon name={IconName.ImagesOutline} size={40} />
              <Text style={styles.uploadTitle}>Upload at least 5 photos</Text>
              <Text style={styles.uploadText}>Upload from your device</Text>
            </TouchableOpacity>
          </>
        )}

        {selectedImages.length !== 0 && (
          <View style={styles.addButtonContainer}>
            <Text style={styles.addButtonTitle}>Choose at least 5 photos</Text>

            <Button
              width={120}
              title="Add more"
              leftIcon={IconName.Add}
              size={BUTTON_SIZES.SM}
              type={ButtonType.SECONDARY}
              onPress={handleOpenGallery}
              style={styles.addButton}
            />
          </View>
        )}

        {selectedImages.map((item, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteImage(index)}>
              <Icon name={IconName.Delete} size={20} color={WHITE} iconSet="material" />
            </TouchableOpacity>
          </View>
        ))}

        {selectedImages.length !== 0 && (
          <TouchableOpacity
            style={[styles.imageContainer, { borderStyle: 'dashed', borderColor: GREY_400 }]}
            onPress={handleOpenGallery}
          >
            <Icon name={IconName.Add} />
            <Text>Add more</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {openPicker && (
        <View style={[styles.imagePickerContainer, { width }]}>
          <ImagePicker
            onSave={(assets) => handleSaveImages(assets)}
            onCancel={() => showAlert('warning', { message: 'no permissions or user go back' })}
            galleryColumns={4}
            limit={10}
            timeSlider
            multiple
            noAlbums
          />
        </View>
      )}

      <Loader visible={isConvertingtoBase64} />
    </StepperTemplate>
  );
};

export default AccommodationImage;
