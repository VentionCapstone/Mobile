import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, ButtonType, Icon, Text, ThemedView } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { AMENITIES_CHIP_DATA } from 'src/screens/profile/CreateAmenities/CreateAmenities.utils';
import { useAppDispatch } from 'src/store';
import { getIsDarkMode } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { BLACK, BUTTON_SIZES, GREY_300, LEVEL_1, TOMATO, WHITE } from 'src/styles';
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

  const badgesMemo = useMemo(() => {
    return Object.keys(cardData.amenities).map((amenity) => {
      const amenityValues = AMENITIES_CHIP_DATA[amenity];
      const separator = ', ';
      if (amenity === 'otherAmenities') {
        return cardData.amenities[amenity as keyof Amenities]
          .split(separator)
          .map((otherAmenity: any) => {
            return (
              <ThemedView
                key={otherAmenity}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
              >
                <Icon name={IconName.Check} size={18} />
                <Text>{otherAmenity}</Text>
              </ThemedView>
            );
          });
      }
      if (cardData.amenities[amenity as keyof Amenities]) {
        const { icon, iconSet, text } = amenityValues;
        return (
          <ThemedView key={amenity} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Icon name={icon} iconSet={iconSet} size={18} />
            <Text>{text}</Text>
          </ThemedView>
        );
      }
      return null;
    });
  }, [cardData.amenities]);

  useEffect(() => {
    getCardData();
  }, []);

  return (
    <ScreenTemplate>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ScrollView>
        <View
          style={{
            width: '100%',
            height: 60,
            backgroundColor: 'rgba(0,0,0,0)',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            position: 'absolute',
            zIndex: 1,
            top: 8,
            left: 0,
            right: 0,
          }}
        >
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
          <View style={{ height: 250, width: '100%', backgroundColor: GREY_300 }} />
          <ThemedView style={{ flex: 1, padding: 20 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28 }}
            >
              <View>
                <Text style={{ fontSize: 30 }}>{`${cardData.address.city}`}</Text>
                <Text style={{ fontSize: 30 }}>{`(${cardData.address.country})`}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                {cardData.availability && <Text>Available</Text>}
                <Icon
                  name={cardData.availability ? IconName.Check : IconName.Ellipse}
                  color={cardData.availability && 'green'}
                />
              </View>
            </View>
            <Text style={{ fontSize: 16 }}>{`Full accomodation, ${cardData.address.street}`}</Text>
            <Text style={{ fontSize: 16 }}>
              {`${cardData.allowedNumberOfPeople} guests · ${cardData.numberOfRooms} rooms · ${cardData.squareMeters} sq. meters`}
            </Text>
            <View style={{ marginTop: 20, marginBottom: 10 }}>
              <Text style={{ fontSize: 18 }}>{cardData.description}</Text>
            </View>
            <Text style={{ fontSize: 25, marginVertical: 15 }}>
              What amenities will be waiting for you?
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
              {badgesMemo}
            </View>
            <View style={{ marginVertical: 30 }}>
              <Text>Available</Text>
              <Text>From: {formatDate(cardData.availableFrom)}</Text>
              <Text>Till: {formatDate(cardData.availableTo)}</Text>
            </View>
          </ThemedView>
        </ScreenTemplate>
      </ScrollView>
      <ThemedView
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 15,
          paddingHorizontal: 20,
          height: 120,
        }}
      >
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
