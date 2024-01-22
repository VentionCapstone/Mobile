import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Alert, Text, WishlistItem } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { useAppDispatch } from 'src/store';
import { getColors, getWishlistError, getWishlistLoader, getWishlists } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';

import styles from './Wishlist.style';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const wishlists = useSelector(getWishlists);
  const wishlistError = useSelector(getWishlistError);
  const wishlistLoader = useSelector(getWishlistLoader);
  const colors = useSelector(getColors);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);

  const handleDelete = async (wishlistId: string) => {
    await dispatch(AsyncThunks.removeFromWishlist(wishlistId));
  };

  const fetchWishlists = async () => {
    await dispatch(AsyncThunks.getWishlists());
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  return (
    <ScreenTemplate>
      <FlatList
        data={wishlists}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <WishlistItem wishlistDetails={item} onDelete={() => handleDelete(item.id)} />
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
            <Text style={styles.title}>Create Your first wishlist</Text>
            <Text style={styles.description}>
              While exploring, click on the heart icon to bookmark your preferred locations
            </Text>
          </View>
        }
        columnWrapperStyle={styles.columnWrapper}
      />

      <Alert
        visible={errorVisible}
        message={wishlistError?.error.message}
        onClose={() => setErrorVisible(false)}
      />
    </ScreenTemplate>
  );
};

export default Wishlist;
