import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Image } from 'react-native';
import { RootStackParamList } from 'src/navigation';
import { GREY_300 } from 'src/styles';
import { AdressListingValues, IconName } from 'src/types';

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
  return (
    <TouchableOpacity
      style={{ flex: 1, height: 480, marginVertical: 5, padding: 16 }}
      onPress={() => navigation.navigate('CardById')}
    >
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor: GREY_300,
          height: '75%',
          borderRadius: 15,
        }}
      >
        <Image source={{ uri: thumbnailUrl }} style={{ width: '100%', height: '100%' }} alt="Img" />
      </View>
      <View style={{ padding: 10, gap: 3 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* <Text style={{ fontSize: 18, fontWeight: 'bold' }}>somewhere in sweden</Text> */}
          <Text
            style={{ fontSize: 18, fontWeight: 'bold' }}
          >{`${address.country} ${address.city}`}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Icon name={IconName.HeartOutline} size={30} />
          </View>
        </View>
        <Text style={{ fontSize: 18 }}>{squareMeters} sq.m.</Text>
        <Text style={{ fontSize: 18 }}>
          {allowedNumberOfPeople > 1 && '1 - '}
          {allowedNumberOfPeople}
        </Text>
        <Text style={{ fontSize: 18 }}>{numberOfRooms} rooms</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>${price / 100}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
