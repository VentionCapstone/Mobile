import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { AsyncThunks } from 'src/store/thunks';
import { TOMATO } from 'src/styles';
import { AdressListingValues, IconName } from 'src/types';

import { styles } from './Card.styles';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

interface CardProps {
  id: string;
  thumbnailUrl: string;
  squareMeters: number;
  numberOfRooms: number;
  allowedNumberOfPeople: number;
  price: number;
  address: AdressListingValues;
}

const Card = ({
  id,
  thumbnailUrl,
  squareMeters,
  numberOfRooms,
  allowedNumberOfPeople,
  price,
  address,
}: CardProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [pressed, setPressed] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handlePressed = () => {
    if (!pressed) {
      const response = dispatch(AsyncThunks.addToWishlist(id));
      if (response.payload?.success) {
        setPressed(true);
      } else {
        setPressed(false);
      }
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('AccommodationDetails', { accomodationId: id })}
    >
      <Image style={styles.imageContainer} source={{ uri: thumbnailUrl }} alt="Img" />
      <View style={styles.bodyContent}>
        <View style={styles.bodyFlex}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {`${address.country}, ${address.city}`}
          </Text>
          <TouchableOpacity style={styles.icon} onPress={handlePressed}>
            {pressed ? (
              <Icon name={IconName.Heart} size={30} color={TOMATO} />
            ) : (
              <Icon name={IconName.HeartOutline} size={30} />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>{squareMeters} sq.m.</Text>
        <Text style={styles.text}>
          {allowedNumberOfPeople > 1 && '1 - '}
          {allowedNumberOfPeople} guests
        </Text>
        <Text style={styles.text}>{numberOfRooms} rooms</Text>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>${price / 100}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
