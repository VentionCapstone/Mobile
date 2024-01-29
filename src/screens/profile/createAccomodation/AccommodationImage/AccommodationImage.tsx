import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Asset, ImagePicker } from 'expo-image-multiple-picker';
import { useEffect, useState } from 'react';
import { TouchableOpacity, Image, View, ScrollView, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, ButtonType, Icon, Text } from 'src/components';
import { StepperTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getAccommodationLoader, getColors } from 'src/store/selectors';
import { accommodationActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { BUTTON_SIZES, GREY_400, WHITE } from 'src/styles';
import { IconName } from 'src/types';

import { styles } from './AccommodationImage.style';

type Props = NativeStackScreenProps<RootStackParamList, 'AccommodationImage'>;

const AccommodationImage = ({ route, navigation }: Props) => {
  const { accommodationId } = route.params;

  const dispatch = useAppDispatch();
  const colors = useSelector(getColors);
  const loader = useSelector(getAccommodationLoader);
  const { width } = useWindowDimensions();
  const [openPicker, setOpenPicker] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<Asset[]>([]);

  const handleOpenGallery = async () => {
    setOpenPicker(true);
  };

  const handleSaveImages = async (assets: Asset[]) => {
    setSelectedImages(assets);
    setOpenPicker(false);
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

    selectedImages.forEach((image) => {
      formData.append('images', {
        uri: image.uri,
        name: image.filename,
        type: 'image/jpeg',
      } as any);
    });

    const response = await dispatch(
      AsyncThunks.uploadAccommodationImages({
        formData,
        accommodationId,
      })
    );

    if (response.payload?.success) {
      navigation.navigate('MyAccommodations');
    }
  };

  useEffect(() => {
    dispatch(accommodationActions.clearError());
  }, [dispatch]);

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
              style={[styles.uploaderContainer, { backgroundColor: colors.secondaryBackground }]}
              onPress={handleOpenGallery}
            >
              <Icon name={IconName.ImagesOutline} size={40} />
              <Text style={styles.uploadTitle}>Upload at least 5 photos</Text>
              <Text style={styles.uploadText}>Upload from your device</Text>
            </TouchableOpacity>
          </>
        )}

        {selectedImages.length !== 0 && (
          <>
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

            {selectedImages.map((item, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri: item.uri }} style={styles.image} />
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteImage(index)}
                >
                  <Icon name={IconName.Delete} size={20} color={WHITE} iconSet="material" />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={[styles.imageContainer, { borderStyle: 'dashed', borderColor: GREY_400 }]}
              onPress={handleOpenGallery}
            >
              <Icon name={IconName.Add} />
              <Text>Add more</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      {openPicker && (
        <View style={[styles.imagePickerContainer, { width }]}>
          <ImagePicker
            onSave={(assets) => handleSaveImages(assets)}
            galleryColumns={4}
            limit={10}
            timeSlider
            multiple
            noAlbums
          />
        </View>
      )}
    </StepperTemplate>
  );
};

export default AccommodationImage;
