import { useState } from 'react';
import { TouchableOpacity, Image, View, Pressable, Text } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'src/components/Icon/Icon';
import showAlert from 'src/components/alert';
import { getColors } from 'src/store/selectors';
import { IconName } from 'src/types/ui';

import { styles } from './ProfileImage.style';
import { pickImage } from './ProfileImage.utils';

interface Props {
  onPhotoSelect: (photo: string) => void;
}

const ProfileImageUploader = ({ onPhotoSelect }: Props) => {
  const colors = useSelector(getColors);

  const [photo, setPhoto] = useState<string | undefined>('');

  const handlePickImage = async () => {
    const selectedPhoto = await pickImage();

    if (selectedPhoto) {
      setPhoto(selectedPhoto);
    } else {
      showAlert('error', { message: 'Could not pick an image' });
    }
  };

  return (
    <View style={styles.profileImageContainer}>
      <TouchableOpacity style={{ width: '100%', alignItems: 'center' }}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.profileImage} />
        ) : (
          <View style={[styles.iconContainer, { backgroundColor: colors.secondaryBackground }]}>
            <Icon name={IconName.PersonOutline} size={80} />
          </View>
        )}
      </TouchableOpacity>
      <Pressable style={styles.addPhotoButton} onPress={handlePickImage}>
        <Icon name={IconName.Camera} size={20} />
        <Text>add photo</Text>
      </Pressable>
    </View>
  );
};

export default ProfileImageUploader;
