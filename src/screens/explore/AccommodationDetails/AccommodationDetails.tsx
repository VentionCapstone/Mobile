import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  Button,
  ButtonType,
  Icon,
  ImageCarousel,
  Text,
  ThemedView,
  showAlert,
} from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import {
  getAccommodation,
  getAccommodationLoader,
  getColors,
  getIsLoggedIn,
} from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { BUTTON_SIZES, GREY_200, TOMATO } from 'src/styles';
import { IconName } from 'src/types';

import { styles } from './AccommodationDetails.styles';
import {
  AmenityChip,
  formatDate,
  getAmenitiesBadges,
  getOtherAmenitiesBadges,
} from './AccommodationDetails.utils.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'AccommodationDetails'>;

const AccommodationDetails = ({ route, navigation }: Props) => {
  const acccomodationId = route.params.accommodationId;
  const dispatch = useAppDispatch();
  const colors = useSelector(getColors);
  const accommodation = useSelector(getAccommodation);
  const refreshing = useSelector(getAccommodationLoader);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const [heartPressed, setHeartPressed] = useState<boolean>(false);

  const accommodationMedia = useMemo(
    () => accommodation?.media?.map((media) => media.imageUrl) || [],
    [accommodation]
  );

  const handleAddToWishlist = async (acccomodationId: string) => {
    await dispatch(AsyncThunks.addToWishlist(acccomodationId));
  };

  const handleRemoveFromWishlist = async (accommodationId: string) => {
    await dispatch(AsyncThunks.removeFromWishlist(accommodationId));
  };

  const handleToggleWishlist = () => {
    if (!isLoggedIn) {
      showAlert('warning', { message: 'You should be logged in to add your wishlists' });
      return;
    }

    setHeartPressed(!heartPressed);
    if (heartPressed) {
      handleRemoveFromWishlist(acccomodationId);
    } else {
      handleAddToWishlist(acccomodationId);
    }
  };

  const amenitiesBadges = useMemo(() => {
    if (accommodation?.amenities) {
      const amenitiesBadges = getAmenitiesBadges(accommodation?.amenities);
      return amenitiesBadges.map(({ icon, text, iconSet }: AmenityChip) => (
        <ThemedView key={text} style={styles.badge}>
          <Icon name={icon} size={20} iconSet={iconSet} />
          <Text style={styles.badgeText}>{text}</Text>
        </ThemedView>
      ));
    }
  }, [accommodation]);

  const otherAmenitiesBadgesMemo = useMemo(() => {
    if (accommodation?.amenities) {
      const otherAmenitiesBadges = getOtherAmenitiesBadges(accommodation?.amenities);
      return otherAmenitiesBadges.map((amenity) => (
        <ThemedView key={amenity.text} style={styles.badge}>
          <Icon name={IconName.Check} size={20} />
          <Text style={styles.badgeText}>{amenity.text}</Text>
        </ThemedView>
      ));
    }
  }, [accommodation]);

  const fetchAccommodation = useCallback(async () => {
    const response = await dispatch(AsyncThunks.getAccommodation(acccomodationId));

    if (!response.payload?.success) {
      navigation.goBack();
    }
  }, [dispatch, acccomodationId, navigation]);

  useEffect(() => {
    fetchAccommodation();
  }, [fetchAccommodation]);

  return (
    <ScreenTemplate>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchAccommodation} />}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
            <Icon name={IconName.BackChevron} size={24} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon} onPress={handleToggleWishlist}>
            {heartPressed ? (
              <Icon name={IconName.Heart} color={TOMATO} size={24} />
            ) : (
              <Icon name={IconName.HeartOutline} size={24} />
            )}
          </TouchableOpacity>
        </View>

        <ThemedView>
          <Image source={{ uri: accommodation?.thumbnailUrl }} style={styles.imagePlaceholder} />
          <View style={styles.container}>
            <Text style={styles.headTitle}>{accommodation?.title}</Text>
            <View style={styles.titleContainer}>
              <Text style={styles.address}>
                {accommodation?.address?.city}
                {', '}
                {accommodation?.address.country}
              </Text>
              <View style={styles.availabilityContainer}>
                {accommodation?.available && <Text>Available</Text>}
                <Icon
                  name={accommodation?.available ? IconName.Check : IconName.Ellipse}
                  color={accommodation?.available ? 'green' : GREY_200}
                  size={20}
                />
              </View>
            </View>

            <Text
              style={styles.subtitle}
            >{`Full accomodation, ${accommodation?.address?.street}`}</Text>
            <Text style={styles.subtitle}>
              {`${accommodation?.allowedNumberOfPeople} guests · ${accommodation?.numberOfRooms} rooms · ${accommodation?.squareMeters} sq. meters`}
            </Text>

            <Text style={styles.description}>{accommodation?.description}</Text>

            <TouchableOpacity
              onPress={() =>
                accommodation &&
                navigation.navigate('HostProfile', { hostId: accommodation?.owner.id })
              }
              style={[styles.profileContainer, { backgroundColor: colors.background }]}
            >
              {accommodation?.owner && (
                <>
                  <Image
                    source={{ uri: accommodation?.owner?.profile?.imageUrl }}
                    style={styles.avatar}
                  />
                  <View>
                    <Text style={styles.profileText}>
                      {accommodation?.owner?.firstName ?? ''} {accommodation?.owner?.lastName ?? ''}
                    </Text>
                    <Text>{accommodation?.owner.profile.country ?? ''}</Text>
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

            <View>
              <Text style={styles.amenitiesTitle}>Amenities</Text>
              <View style={styles.badgesContainer}>
                {amenitiesBadges}
                {otherAmenitiesBadgesMemo}
              </View>
            </View>

            <View style={{ marginVertical: 30 }}>
              <Text style={styles.amenitiesTitle}>More photos</Text>
              <ImageCarousel images={accommodationMedia} />
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text>Available</Text>
              <Text>From: {formatDate(accommodation?.availableFrom ?? '')}</Text>
              <Text>Till: {formatDate(accommodation?.availableTo ?? '')}</Text>
            </View>
          </View>
        </ThemedView>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={{ fontSize: 20 }}>Total price: ${accommodation?.price ?? 0 / 100}</Text>
        <Button
          title="Book"
          onPress={() => {}}
          size={BUTTON_SIZES.MD}
          type={ButtonType.PRIMARY}
          disabled
        />
      </View>
    </ScreenTemplate>
  );
};

export default AccommodationDetails;
