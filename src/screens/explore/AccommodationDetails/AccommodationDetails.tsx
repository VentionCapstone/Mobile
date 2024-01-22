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
import { getAccommodation, getAccommodationLoader, getIsDarkMode } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { BLACK, BUTTON_SIZES, LEVEL_1, TOMATO, WHITE } from 'src/styles';
import { IconName, Media } from 'src/types';

import { styles } from './AccommodationDetails.styles';

type AccommodationDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AccommodationDetails'
>;
type AccommodationDetailsRouteProp = RouteProp<RootStackParamList, 'AccommodationDetails'>;

type AccommodationDetailsProps = {
  navigation: AccommodationDetailsNavigationProp;
  route: AccommodationDetailsRouteProp;
};

const AccommodationDetails = ({ route }: AccommodationDetailsProps) => {
  const acccomodationId = route.params?.accomodationId;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useSelector(getIsDarkMode);
  const data = useSelector(getAccommodation);
  const refreshing = useSelector(getAccommodationLoader);
  const [heartPressed, setHeartPressed] = useState<boolean>(false);

  const mappedMedia = useMemo(
    () => data?.media.map((media: Media) => media?.imageUrl),
    [data?.media]
  );

  const handleHeartPress = () => {
    setHeartPressed(!heartPressed);
  };

  const getCardData = useCallback(async () => {
    const response = await dispatch(AsyncThunks.getAccommodation(acccomodationId));
    if (!response.payload?.success) {
      navigation.goBack();
    }
  }, [dispatch, acccomodationId, navigation]);

  const refreshCardData = useCallback(async () => {
    getCardData();
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
        <ThemedView>
          <Image source={{ uri: data?.thumbnailUrl }} style={styles.imagePlaceholder} />
          <View style={styles.container}>
            <Text style={styles.headTitle}>{data?.title}</Text>
            <View style={styles.titleContainer}>
              <View>
                <Text style={styles.title}>{`${data?.address?.city}`}</Text>
                <Text style={styles.title}>{`(${data?.address?.country})`}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                {data?.available && <Text>Available</Text>}
                <Icon
                  name={data?.available ? IconName.Check : IconName.Ellipse}
                  color={data?.available && 'green'}
                />
              </View>
            </View>
            <Text style={styles.subtitle}>{`Full accomodation, ${data?.address?.street}`}</Text>
            <Text style={styles.subtitle}>
              {`${data?.allowedNumberOfPeople} guests · ${data?.numberOfRooms} rooms · ${data?.squareMeters} sq. meters`}
            </Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{data?.description}</Text>
            </View>
            <View style={styles.profileContainer}>
              {data?.owner && (
                <>
                  <Image source={{ uri: data?.owner?.profile?.imageUrl }} style={styles.avatar} />
                  <View>
                    <Text style={styles.profileText}>
                      {data?.owner?.firstName ?? ''} {data?.owner?.lastName ?? ''}
                    </Text>
                    <Text>{data?.owner?.profile?.country ?? ''}</Text>
                  </View>
                  {data?.owner?.isVerified && (
                    <>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                        <Icon name={IconName.Check} color="green" />
                      </View>
                    </>
                  )}
                </>
              )}
            </View>
            <View style={{ marginVertical: 30 }}>
              <Text style={styles.amenitiesTitle}>More photos</Text>
              <ImageCarousel images={mappedMedia} />
            </View>
            <View style={{ marginVertical: 30 }}>
              <Text>Available</Text>
              <Text>From: {formatDate(data?.availableFrom ?? '')}</Text>
              <Text>Till: {formatDate(data?.availableTo ?? '')}</Text>
            </View>
          </View>
        </ThemedView>
      </ScrollView>
      <ThemedView style={styles.footer}>
        <Text style={{ fontSize: 20 }}>Total price: ${data?.price ?? 0 / 100}</Text>
        <Button
          title="Book"
          onPress={() => {}}
          disabled={!data?.available}
          size={BUTTON_SIZES.MD}
          type={ButtonType.PRIMARY}
        />
      </ThemedView>
    </ScreenTemplate>
  );
};

export default AccommodationDetails;
