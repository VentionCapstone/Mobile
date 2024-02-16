import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, ButtonType, Icon, Text, showToast } from 'src/components';
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
import { BUTTON_SIZES } from 'src/styles';
import { IconName } from 'src/types';

import { styles } from './AccommodationDetails.styles';
import AccommodationDetailsContent from './components/AccommodationDetailsContent/AccommodationDetailsContent';
import AccommodationImages from './components/AccommodationImages/AccommodationImages';
import AmenitiesCard from './components/AmenitiesCard/AmenitiesCard';
import HostProfileCard from './components/HostProfileCard/HostProfileCard';

type Props = NativeStackScreenProps<RootStackParamList, 'AccommodationDetails'>;

const AccommodationDetails = ({ route, navigation }: Props) => {
  const { accommodationId } = route.params;
  const dispatch = useAppDispatch();
  const colors = useSelector(getColors);
  const accommodation = useSelector(getAccommodation);
  const refreshing = useSelector(getAccommodationLoader);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const { t } = useTranslation();
  const [heartPressed, setHeartPressed] = useState<boolean>(false);

  const handleAddToWishlist = async (acccomodationId: string) => {
    await dispatch(AsyncThunks.addToWishlist(acccomodationId));
  };

  const handleRemoveFromWishlist = async (accommodationId: string) => {
    await dispatch(AsyncThunks.removeFromWishlist(accommodationId));
  };

  const handleToggleWishlist = () => {
    if (!isLoggedIn) {
      showToast({ type: 'info', text1: 'You should be logged in to add your wishlists' });
      return;
    }

    if (heartPressed) {
      handleRemoveFromWishlist(accommodationId);
      setHeartPressed(false);
    } else {
      handleAddToWishlist(accommodationId);
      setHeartPressed(true);
    }
  };

  const fetchAccommodation = useCallback(async () => {
    const response = await dispatch(AsyncThunks.getAccommodation(accommodationId));

    if (!response.payload?.success) {
      navigation.goBack();
    }
  }, [dispatch, accommodationId, navigation]);

  useEffect(() => {
    fetchAccommodation();
  }, [fetchAccommodation]);

  return (
    <ScreenTemplate headerShown={false}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchAccommodation}
            progressBackgroundColor={colors.secondaryBackground}
            colors={[colors.tint]}
          />
        }
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.icon, { backgroundColor: colors.background }]}
            onPress={() => navigation.goBack()}
          >
            <Icon name={IconName.BackChevron} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.icon, { backgroundColor: colors.background }]}
            onPress={handleToggleWishlist}
          >
            <Icon
              name={heartPressed ? IconName.Heart : IconName.HeartOutline}
              size={20}
              color={colors.tint}
            />
          </TouchableOpacity>
        </View>

        <View>
          <Image source={{ uri: accommodation?.thumbnailUrl }} style={styles.imagePlaceholder} />
          <View style={styles.container}>
            <AccommodationDetailsContent accommodation={accommodation} />
            <HostProfileCard accommodation={accommodation} />
            <AmenitiesCard accommodation={accommodation} />
            <AccommodationImages accommodation={accommodation} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={{ fontSize: 16 }}>
          {t('Total price:')} ${accommodation?.price}
        </Text>

        <Button
          title={t('Book')}
          onPress={() => {}}
          size={BUTTON_SIZES.SM}
          type={ButtonType.PRIMARY}
          disabled
        />
      </View>
    </ScreenTemplate>
  );
};

export default AccommodationDetails;
