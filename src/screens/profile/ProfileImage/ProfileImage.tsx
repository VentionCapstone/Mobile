import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImagePickerAsset } from 'expo-image-picker';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View, Text, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, ButtonType } from 'src/components';
import Icon from 'src/components/Icon/Icon';
import { ScreenTemplate } from 'src/components/templates';
import { pickImage } from 'src/helper/pickProfileImage';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getAccountLoader, getColors } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { BUTTON_SIZES } from 'src/styles';
import { IconName } from 'src/types/ui';

import { styles } from './ProfileImage.style';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileImage'>;

const ProfileImage = ({ navigation }: Props) => {
  const colors = useSelector(getColors);
  const dispatch = useAppDispatch();
  const imageLoader = useSelector(getAccountLoader);
  const { t } = useTranslation();

  const [image, setImage] = useState<ImagePickerAsset>();

  const handlePickImage = async () => {
    const selectedPhoto = await pickImage();

    if (selectedPhoto) {
      setImage(selectedPhoto);
    }
  };

  const handleSaveImage = async () => {
    const formData = new FormData();

    if (image) {
      formData.append('image', {
        uri: image?.uri,
        name: 'image',
        type: 'image/jpeg',
      } as any);

      const response = await dispatch(AsyncThunks.addProfileImage(formData));

      if (response.meta.requestStatus === 'fulfilled') {
        navigation.navigate('Profile');
      }
    }
  };

  const handleSkip = () => {
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
            <Text>{t('add image')}</Text>
            <Icon name={IconName.Edit} iconSet="material" size={16} />
          </Pressable>
        </View>

        <Text style={styles.title}>{t('Upload Your Profile Image')}</Text>
        <Text style={styles.subTitle}>
          {t(
            "Let's add a personal touch to your profile! Upload a clear and friendly photo so others can recognize you"
          )}
        </Text>

        <View style={styles.buttonsContainer}>
          <Button
            title={t('Save')}
            size={BUTTON_SIZES.SM}
            onPress={handleSaveImage}
            isLoading={imageLoader}
            style={styles.saveButton}
            disabled={!image}
          />
          <Button
            title={t('Skip')}
            size={BUTTON_SIZES.SM}
            type={ButtonType.SECONDARY}
            onPress={handleSkip}
            isLoading={imageLoader}
            style={styles.saveButton}
          />
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default ProfileImage;
