import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
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
import { Button, ButtonType, Icon, ImageCarousel, Text, ThemedView } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getIsDarkMode } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { BLACK, BUTTON_SIZES, LEVEL_1, TOMATO, WHITE } from 'src/styles';
import { AccommodationFullView, IconName } from 'src/types';

import { styles } from './CardById.styles';
import { AMENITIES_CHIP_DATA, DEFAULT_ACCOMMODATION_VIEW, formatDate } from './CardById.utils';

type CardByIdNavigationProp = StackNavigationProp<RootStackParamList, 'CardById'>;
type CardByIdRouteProp = RouteProp<RootStackParamList, 'CardById'>;

type CardByIdProps = {
  navigation: CardByIdNavigationProp;
  route: CardByIdRouteProp;
};

const CardById = ({ route }: CardByIdProps) => {
  const acccomodationId = route.params?.accomodationId;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useSelector(getIsDarkMode);
  const [cardData, setCardData] = useState<AccommodationFullView>(DEFAULT_ACCOMMODATION_VIEW);
  const [heartPressed, setHeartPressed] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const mappedMedia = cardData.media.map((media) => media.imageUrl);

  const handleHeartPress = () => {
    setHeartPressed(!heartPressed);
  };

  const getCardData = useCallback(async () => {
    const response = await dispatch(AsyncThunks.getAccommodation(acccomodationId));
    if (response.payload?.success) {
      setCardData(response.payload?.data);
    } else {
      return null;
    }
  }, [dispatch, acccomodationId]);

  const AmenitiesBadges = useMemo(() => {
    const { otherAmenities, id, accommodationId, ...rest } = cardData.amenities[0];
    const amenities = Object.keys(rest);
    return amenities.map((amenity) => {
      if (rest[amenity as keyof typeof rest]) {
        const { icon, text, iconSet } =
          AMENITIES_CHIP_DATA[amenity as keyof typeof AMENITIES_CHIP_DATA];
        return (
          <ThemedView key={amenity} style={styles.badge}>
            <Icon name={icon} size={20} iconSet={iconSet} />
            <Text style={styles.badgeText}>{text}</Text>
          </ThemedView>
        );
      }
    });
  }, [cardData.amenities]);

  const otherAmenitiesBadgesMemo = useMemo(() => {
    const separator = ', ';
    if (cardData.amenities[0].otherAmenities) {
      return cardData.amenities[0]['otherAmenities'].split(separator).map((amenity) => {
        return (
          <ThemedView key={amenity} style={styles.badge}>
            <Icon name={IconName.Check} size={20} />
            <Text style={styles.badgeText}>{amenity}</Text>
          </ThemedView>
        );
      });
    }
  }, [cardData.amenities]);

  const refreshCardData = useCallback(async () => {
    setRefreshing(true);
    await getCardData();
    setRefreshing(false);
  }, [getCardData]);

  useEffect(() => {
    getCardData();
  }, []);

  return (
    <ScreenTemplate>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshCardData} />}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={[
              styles.icon,
              LEVEL_1,
              {
                backgroundColor: theme ? BLACK : WHITE,
                borderColor: theme ? WHITE : BLACK,
                shadowColor: theme ? WHITE : BLACK,
              },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Icon name={IconName.BackChevron} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.icon,
              LEVEL_1,
              {
                backgroundColor: theme ? BLACK : WHITE,
                borderColor: theme ? WHITE : BLACK,
                shadowColor: theme ? WHITE : BLACK,
              },
            ]}
            onPress={handleHeartPress}
          >
            {heartPressed ? (
              <Icon name={IconName.Heart} color={TOMATO} size={24} />
            ) : (
              <Icon name={IconName.HeartOutline} size={24} />
            )}
          </TouchableOpacity>
        </View>
        {/* Main Content */}
        <ScreenTemplate>
          <Image source={{ uri: cardData.thumbnailUrl }} style={styles.imagePlaceholder} />
          <ThemedView style={styles.container}>
            <Text style={styles.headTitle}>{cardData.title}</Text>
            <View style={styles.titleContainer}>
              <View>
                <Text style={styles.title}>{`${cardData.address.city}`}</Text>
                <Text style={styles.title}>{`(${cardData.address.country})`}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                {cardData.available && <Text>Available</Text>}
                <Icon
                  name={cardData.available ? IconName.Check : IconName.Ellipse}
                  color={cardData.available && 'green'}
                />
              </View>
            </View>
            <Text style={styles.subtitle}>{`Full accomodation, ${cardData.address.street}`}</Text>
            <Text style={styles.subtitle}>
              {`${cardData.allowedNumberOfPeople} guests · ${cardData.numberOfRooms} rooms · ${cardData.squareMeters} sq. meters`}
            </Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{cardData.description}</Text>
            </View>
            <View style={styles.profileContainer}>
              {cardData.owner && (
                <>
                  <Image source={{ uri: cardData.owner.profile.imageUrl }} style={styles.avatar} />
                  <View>
                    <Text style={styles.profileText}>
                      {cardData.owner.firstName} {cardData.owner.lastName}
                    </Text>
                    <Text>{cardData.owner.profile.country}</Text>
                  </View>
                  {cardData.owner.isVerified && (
                    <>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                        <Icon name={IconName.Check} color="green" />
                      </View>
                    </>
                  )}
                </>
              )}
            </View>
            <Text style={styles.amenitiesTitle}>What amenities will be waiting for you?</Text>
            <View style={styles.badgesContainer}>
              {AmenitiesBadges}
              {otherAmenitiesBadgesMemo}
            </View>
            <View style={{ marginVertical: 30 }}>
              <Text style={styles.amenitiesTitle}>More photos</Text>
              <ImageCarousel images={mappedMedia} />
            </View>
            <View style={{ marginVertical: 30 }}>
              <Text>Available</Text>
              <Text>From: {formatDate(cardData.availableFrom)}</Text>
              <Text>Till: {formatDate(cardData.availableTo)}</Text>
            </View>
          </ThemedView>
        </ScreenTemplate>
      </ScrollView>
      <ThemedView style={styles.footer}>
        <Text style={{ fontSize: 20 }}>Total price: ${cardData.price / 100}</Text>
        <Button
          title="Book"
          onPress={() => {}}
          disabled={!cardData.available}
          size={BUTTON_SIZES.MD}
          type={ButtonType.PRIMARY}
        />
      </ThemedView>
    </ScreenTemplate>
  );
};

export default CardById;
