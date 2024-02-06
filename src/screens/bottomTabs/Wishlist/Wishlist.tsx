import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, ErrorAlert, Text, WishlistItem } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import {
  getColors,
  getIsLoggedIn,
  getWishlistError,
  getWishlistLoader,
  getWishlists,
} from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';

import styles from './Wishlist.style';

type Props = NativeStackScreenProps<RootStackParamList, 'Wishlist'>;

const Wishlist = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const wishlists = useSelector(getWishlists);
  const wishlistError = useSelector(getWishlistError);
  const wishlistLoader = useSelector(getWishlistLoader);
  const colors = useSelector(getColors);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const { t } = useTranslation();
  const [errorVisible, setErrorVisible] = useState<boolean>(false);

  const handleRemoveFromWishlist = async (accommodationId: string) => {
    await dispatch(AsyncThunks.removeFromWishlist(accommodationId));
  };

  const fetchWishlists = useCallback(async () => {
    await dispatch(AsyncThunks.getWishlists());
  }, [dispatch]);

  const handleNavigateToAccommodationDetails = (accommodationId: string) => {
    navigation.navigate('AccommodationDetails', { accommodationId });
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchWishlists();
    }
  }, [dispatch, isLoggedIn, fetchWishlists]);

  return (
    <ScreenTemplate headerShown={false}>
      {isLoggedIn && (
        <FlatList
          data={wishlists}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <WishlistItem
              wishlistDetails={item}
              onRemove={(accommodationId: string) => handleRemoveFromWishlist(accommodationId)}
              onNavigateToAccommodationDetails={handleNavigateToAccommodationDetails}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={wishlistLoader}
              onRefresh={fetchWishlists}
              progressBackgroundColor={colors.background}
              colors={[colors.tint]}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyComponent}>
              <Text style={styles.title}>{t('Create Your first wishlist')}</Text>
              <Text style={styles.description}>
                {t('While exploring, click on the heart icon to bookmark your preferred locations')}
              </Text>
            </View>
          }
          columnWrapperStyle={styles.columnWrapper}
        />
      )}

      {!isLoggedIn && (
        <View style={styles.container}>
          <Text style={styles.signInFirst}>{t('Please sign in first to view your wishlists')}</Text>
          <Button title={t('Sign in first')} onPress={() => navigation.navigate('Signin')} />
        </View>
      )}

      <ErrorAlert
        visible={errorVisible}
        message={wishlistError?.error.message}
        onClose={() => setErrorVisible(false)}
      />
    </ScreenTemplate>
  );
};

export default Wishlist;
