import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Swiper from 'react-native-swiper';
import { useSelector } from 'react-redux';
import { Text } from 'src/components';
import { RootStackParamList } from 'src/navigation';
import { getColors } from 'src/store/selectors';
import { HostProfile } from 'src/types';

import styles from './HostListings.styles';

interface Props {
  host: HostProfile;
}

const HostListings = ({ host }: Props) => {
  const colors = useSelector(getColors);

  const { firstName, accommodations } = host;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [sliderAccommodations] = useState(accommodations?.slice(0, 12));

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`Listings for ${firstName}`}</Text>
      </View>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        activeDotColor={colors.icon}
        paginationStyle={styles.dotContainer}
      >
        {sliderAccommodations?.map((accommodation) => (
          <TouchableOpacity
            key={accommodation.id}
            onPress={() =>
              navigation.navigate('AccommodationDetails', { accommodationId: accommodation.id })
            }
            style={styles.slide}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.accommodationImage}
                source={{ uri: accommodation.previewImgUrl }}
                src={accommodation.previewImgUrl}
                alt="accommodation preview image"
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.titleText} numberOfLines={1}>
                {accommodation.title}
              </Text>
              <View style={styles.rating}>
                <AirbnbRating
                  count={5}
                  defaultRating={accommodation.rating}
                  showRating={false}
                  size={15}
                  isDisabled
                  selectedColor={colors.tint}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  );
};

export default HostListings;
