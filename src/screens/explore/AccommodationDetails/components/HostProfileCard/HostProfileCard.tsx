import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon, Text } from 'src/components';
import { RootStackParamList } from 'src/navigation';
import { getColors } from 'src/store/selectors';
import { Accommodation, IconName } from 'src/types';

import { styles } from './HostProfileCard.style';

type Props = {
  accommodation?: Accommodation | null;
};

const HostProfileCard = ({ accommodation }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const colors = useSelector(getColors);

  return (
    <TouchableOpacity
      onPress={() =>
        accommodation && navigation.navigate('HostProfile', { hostId: accommodation?.owner.id })
      }
      style={[styles.profileContainer, { backgroundColor: colors.background }]}
    >
      {accommodation?.owner && (
        <>
          <Image source={{ uri: accommodation?.owner?.profile?.imageUrl }} style={styles.avatar} />
          <View>
            <Text style={styles.profileText}>
              {accommodation?.owner?.firstName ?? ''} {accommodation?.owner?.lastName ?? ''}
            </Text>
            <Text>{accommodation?.owner?.profile?.country ?? ''}</Text>
          </View>
          {accommodation?.owner && (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                <Icon name={IconName.Check} color="green" />
              </View>
            </>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default HostProfileCard;
