import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { Card, ExploreHeader, SearchModal } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { useAppDispatch } from 'src/store';
import { getAccommodationList, getAccommodationListLoading } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { SearchValues } from 'src/types';

import styles from './Explore.style';

const Explore = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const accommodationsList = useSelector(getAccommodationList);
  const isLoading = useSelector(getAccommodationListLoading);

  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

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
    await dispatch(AsyncThunks.addToWishlist(accommodationId));
  };

  const handleRemoveFromWishlist = async (accommodationId: string) => {
    await dispatch(AsyncThunks.removeFromWishlist(accommodationId));
  };

  const handleGetSearchValues = useCallback(
    async (searchValues: SearchValues) => {
      const { location, checkInDate, checkOutDate } = searchValues;

      if (searchValues) {
        await dispatch(
          AsyncThunks.getListOfAccommodations({
            page: 1,
            limit: 10,
            location,
            checkInDate,
            checkOutDate,
          })
        );
      }
    },
    [dispatch]
  );

  const handleCloseSearchModal = () => {
    setIsSearchVisible(false);
  };

  const handleOpenSearchModal = () => {
    setIsSearchVisible(true);
  };

  useEffect(() => {
    fetchAccommodationList();
  }, [page, fetchAccommodationList]);

  return (
    <ScreenTemplate>
      <ExploreHeader onOpenSearchModal={handleOpenSearchModal} />

      <SearchModal
        visible={isSearchVisible}
        onClose={handleCloseSearchModal}
        onSelect={handleGetSearchValues}
      />

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
