import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImagePickerAsset } from 'expo-image-picker';
import { useCallback, useState } from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { Alert, Button, ButtonType, Loader } from 'src/components';
import Icon from 'src/components/Icon/Icon';
import { ScreenTemplate } from 'src/components/templates';
import { pickImage } from 'src/helper/pickProfileImage';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getAccountLoader, getColors } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { BUTTON_SIZES } from 'src/styles';
import { AlertType, IconName } from 'src/types/ui';

import { styles } from './ProfileImage.style';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileImage'>;

const ProfileImage = ({ navigation }: Props) => {
  const colors = useSelector(getColors);
  const dispatch = useAppDispatch();
  const imageLoader = useSelector(getAccountLoader);

  const [image, setImage] = useState<ImagePickerAsset>();
  const [successVisible, setSuccessVisible] = useState<boolean>(false);

  const handlePickImage = async () => {
    const selectedPhoto = await pickImage();

    if (selectedPhoto) {
      setImage(selectedPhoto);
    }
  };

  const handleSaveImage = useCallback(async () => {
    const formData = new FormData();

    if (image) {
      formData.append('image', {
        uri: image?.uri,
        name: 'image',
        type: 'image/jpeg',
      } as any);

      const response = await dispatch(AsyncThunks.addProfileImage(formData));

      if (response.meta.requestStatus === 'fulfilled') {
        setSuccessVisible(true);
        navigation.navigate('Profile');
      }
    }
  }, [dispatch, image, navigation]);

  const handleSkip = () => {
    setSuccessVisible(true);
    navigation.navigate('Profile');
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <View style={[styles.imageContainer, { backgroundColor: colors.background }]}>
          {image ? (
            <Image source={{ uri: image?.uri }} style={styles.profileImage} />
          ) : (
            <Icon name={IconName.PersonOutline} size={100} />
          )}

          <Pressable
            style={[styles.editButton, { backgroundColor: colors.secondaryBackground }]}
            onPress={handlePickImage}
          >
            <Text>add image</Text>
            <Icon name={IconName.Edit} iconSet="material" size={16} />
          </Pressable>
        </View>

        <Text style={styles.title}>Upload Your Profile Image</Text>
        <Text style={styles.subTitle}>
          Let's add a personal touch to your profile! Upload a clear and friendly photo so others
          can recognize you
        </Text>

        <View style={styles.buttonsContainer}>
          <Button
            title="Save"
            size={BUTTON_SIZES.SM}
            onPress={handleSaveImage}
            style={styles.saveButton}
            disabled={!image}
          />
          <Button
            title="Skip"
            size={BUTTON_SIZES.SM}
            type={ButtonType.SECONDARY}
            onPress={handleSkip}
            style={styles.saveButton}
          />
        </View>
      </View>

      <Loader visible={imageLoader} message="Uploading..." />
      <Alert
        type={AlertType.Success}
        visible={successVisible}
        message="Profile created successfully"
        onClose={() => setSuccessVisible(false)}
      />
    </ScreenTemplate>
  );
};

export default ProfileImage;
