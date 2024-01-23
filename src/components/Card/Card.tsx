import { NavigationProp, useNavigation } from '@react-navigation/native';
import { memo, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { AsyncThunks } from 'src/store/thunks';
import { TOMATO } from 'src/styles';
import { AccommodationListItem, IconName } from 'src/types';

import { styles } from './Card.styles';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'src/store/selectors';
import showAlert from '../alert';

type Props = {
  item: AccommodationListItem;
  onAddedToWishlist: (accommodationId: string) => void;
  onRemoveFromWishlist: (accommodationId: string) => void;
};

const Card = ({ item, onAddedToWishlist, onRemoveFromWishlist }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const [pressed, setPressed] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleToggleWishlist = () => {
    if (!isLoggedIn) {
      showAlert('warning', { message: 'You should login first!' });
      return;
    }

    setPressed(!pressed);
    if (pressed) {
      onRemoveFromWishlist(item.id);
    } else {
      onAddedToWishlist(item.id);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('AccommodationDetails', { accommodationId: item.id })}
    >
      <Image style={styles.imageContainer} source={{ uri: item.thumbnailUrl }} alt="Img" />
      <View style={styles.bodyContent}>
        <View style={styles.bodyFlex}>
          <Text style={styles.address}>{`${item.address.country}, ${item.address.city}`}</Text>

          <TouchableOpacity style={styles.icon} onPress={handleToggleWishlist}>
            {pressed ? (
              <Icon name={IconName.Heart} size={30} color={TOMATO} />
            ) : (
              <Icon name={IconName.HeartOutline} size={30} />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{item.squareMeters} sq.m.</Text>
        <Text style={styles.description}>
          {item.allowedNumberOfPeople > 1 && '1 - '}
          {item.allowedNumberOfPeople} guests
        </Text>
        <Text style={styles.description}>{item.numberOfRooms} rooms</Text>
        <Text style={styles.price}>
          ${item.price} <Text style={{ fontWeight: '400' }}>night</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Card);
