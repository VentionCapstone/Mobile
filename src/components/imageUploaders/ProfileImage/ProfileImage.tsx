import { TouchableOpacity, Image, View, Pressable, Text } from 'react-native';
import Icon from 'src/components/Icon/Icon';
import { useTheme } from 'src/theme';
import { IconName } from 'src/types/ui';

import { styles } from './ProfileImage.style';
import { pickImage } from './ProfileImage.utils';

interface Props {
  value: string;
  setValue: (photo: string) => void;
}

const ProfileImageUploader = ({ value, setValue }: Props) => {
  const { colors } = useTheme();

  const handlePickImage = async () => {
    const selectedImage = await pickImage();
    selectedImage && setValue(selectedImage);
  };

  return (
    <View style={styles.profileImageWrapper}>
      <TouchableOpacity style={{ width: '100%', alignItems: 'center' }}>
        {value ? (
          <Image source={{ uri: value }} style={styles.profileImage} />
        ) : (
          <View style={[styles.iconWrapper, { backgroundColor: colors.secondaryBackground }]}>
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
