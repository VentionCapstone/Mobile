import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, ButtonType, Icon, Text, ThemedView } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { AMENITIES_CHIP_DATA } from 'src/screens/profile/CreateAmenities/CreateAmenities.utils';
import { useAppDispatch } from 'src/store';
import { getIsDarkMode } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { BLACK, BUTTON_SIZES, LEVEL_1, TOMATO, WHITE } from 'src/styles';
import { AccommodationFullView, IconName } from 'src/types';
import { Amenities } from 'src/types/amenities';

import { styles } from './CardById.styles';
import { formatDate, mockValues } from './CardById.utils';

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
  const [cardData, setCardData] = useState<AccommodationFullView>(mockValues);
  const [heartPressed, setHeartPressed] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleHeartPress = () => {
    setHeartPressed(!heartPressed);
  };

  const getCardData = useCallback(async () => {
    const response = await dispatch(AsyncThunks.getAccommodation(acccomodationId));
    if (response.payload?.success) {
      setCardData(response.payload.data);
    } else {
      return null;
    }
  }, [dispatch, acccomodationId]);

  const badgesMemo = useMemo(() => {
    return Object.keys(cardData.amenities).map((amenity) => {
      const amenityValues = AMENITIES_CHIP_DATA[amenity];
      const separator = ', ';
      if (amenity === 'otherAmenities') {
        const otherAmenities: string = cardData.amenities[amenity as keyof Amenities] as string;
        return otherAmenities.split(separator).map((otherAmenity: any) => {
          return (
            <ThemedView key={otherAmenity} style={styles.badge}>
              <Icon name={IconName.Check} size={20} />
              <Text style={styles.badgeText}>{otherAmenity}</Text>
            </ThemedView>
          );
        });
      }
      if (cardData.amenities[amenity as keyof Amenities]) {
        const { icon, iconSet, text } = amenityValues;
        return (
          <ThemedView key={amenity} style={styles.badge}>
            <Icon name={icon} iconSet={iconSet} size={20} />
            <Text style={styles.badgeText}>{text}</Text>
          </ThemedView>
        );
      }
      return null;
    });
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
          <View style={styles.imagePlaceholder} />
          <ThemedView style={styles.container}>
            <View style={styles.titleContainer}>
              <View>
                <Text style={styles.title}>{`${cardData.address.city}`}</Text>
                <Text style={styles.title}>{`(${cardData.address.country})`}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                {cardData.availability && <Text>Available</Text>}
                <Icon
                  name={cardData.availability ? IconName.Check : IconName.Ellipse}
                  color={cardData.availability && 'green'}
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
            <Text style={styles.amenitiesTitle}>What amenities will be waiting for you?</Text>
            <View style={styles.badgesContainer}>{badgesMemo}</View>
            <View style={{ marginVertical: 30 }}>
              <Text>Available</Text>
              <Text>From: {formatDate(cardData.availableFrom)}</Text>
              <Text>Till: {formatDate(cardData.availableTo)}</Text>
            </View>
          </ThemedView>
        </ScreenTemplate>
      </ScrollView>
      <ThemedView style={styles.footer}>
        <Text style={{ fontSize: 20 }}>Price: {`$${cardData.price}`}</Text>
        <Button
          title="Book"
          onPress={() => {}}
          disabled={cardData.availability}
          size={BUTTON_SIZES.MD}
          type={ButtonType.PRIMARY}
        />
      </ThemedView>
    </ScreenTemplate>
  );
};

export default CardById;
