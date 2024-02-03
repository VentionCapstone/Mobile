import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Swiper from 'react-native-swiper';
import { useSelector } from 'react-redux';
import { Text } from 'src/components';
import { getColors } from 'src/store/selectors';
import { GREY_200, subtitle1 } from 'src/styles';
import { HostProfile } from 'src/types';

interface Props {
  host: HostProfile;
  navigation: any;
}

const HostListings = ({ host, navigation }: Props) => {
  const colors = useSelector(getColors);

  const { firstName, accommodations } = host;

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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    marginBottom: 50,
  },
  titleContainer: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  wrapper: {
    height: 380,
  },
  slide: {
    flex: 1,
    padding: 24,
  },
  dotContainer: {
    bottom: -20,
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: GREY_200,
  },
  accommodationImage: {
    padding: 0,
    width: '100%',
    aspectRatio: 4 / 3,
    objectFit: 'cover',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginTop: 10,
  },
  titleText: {
    ...subtitle1,
    marginBottom: 5,
    overflow: 'hidden',
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HostListings;
