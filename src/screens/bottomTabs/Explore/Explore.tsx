import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { Card } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { useAppDispatch } from 'src/store';
import { getAccommodationList, getAccommodationListLoading } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';

import styles from './Explore.style';

const Explore = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const accommodationsList = useSelector(getAccommodationList);
  const isLoading = useSelector(getAccommodationListLoading);

  const fetchAccommodationList = useCallback(async () => {
    await dispatch(AsyncThunks.getListOfAccommodations({ page, limit: 10 }));
  }, [page, dispatch]);

  const handleRefresh = () => {
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleAddToWishlist = async (accommodationId: string) => {
    const response = await dispatch(AsyncThunks.addToWishlist(accommodationId));

    console.log(response);
  };

  const handleRemoveFromWishlist = async (accommodationId: string) => {
    await dispatch(AsyncThunks.removeFromWishlist(accommodationId));
  };

  useEffect(() => {
    fetchAccommodationList();
  }, [page, fetchAccommodationList]);

  return (
    <ScreenTemplate>
      <FlatList
        contentContainerStyle={styles.container}
        data={accommodationsList?.data}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <Card
            item={item}
            onAddedToWishlist={handleAddToWishlist}
            onRemoveFromWishlist={handleRemoveFromWishlist}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}
      />
    </ScreenTemplate>
  );
};

export default Explore;
