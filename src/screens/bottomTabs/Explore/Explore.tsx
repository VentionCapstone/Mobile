import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Card, ExploreHeader, FilterModal, SearchModal, Text, showAlert } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { useAppDispatch } from 'src/store';
import {
  getAccommodationList,
  getAccommodationListLoading,
  getFilterParams,
  getSearchParams,
} from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';

import styles from './Explore.style';

const Explore = () => {
  const dispatch = useAppDispatch();
  const accommodationsList = useSelector(getAccommodationList);
  const isLoading = useSelector(getAccommodationListLoading);
  const filterParams = useSelector(getFilterParams);
  const searchParams = useSelector(getSearchParams);

  const [page, setPage] = useState(1);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  const fetchAccommodationList = useCallback(async () => {
    await dispatch(AsyncThunks.getListOfAccommodations({ page, ...filterParams, ...searchParams }));
  }, [page, dispatch, filterParams, searchParams]);

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

  const handleCloseSearchModal = () => {
    setIsSearchVisible(false);
  };

  const handleCloseFilterModal = () => {
    setIsFilterVisible(false);
  };

  const handleOpenSearchModal = () => {
    setIsSearchVisible(true);
  };

  const handleOpenFilterModal = () => {
    setIsFilterVisible(true);
  };

  const handleLoginRequired = useCallback(() => {
    showAlert('warning', { message: 'You should be logged in to add your wishlists' });
  }, []);

  useEffect(() => {
    fetchAccommodationList();
  }, [page, fetchAccommodationList]);

  return (
    <ScreenTemplate>
      <ExploreHeader
        onOpenSearchModal={handleOpenSearchModal}
        onOpenFilterModal={handleOpenFilterModal}
      />

      <SearchModal visible={isSearchVisible} onClose={handleCloseSearchModal} />
      <FilterModal visible={isFilterVisible} onClose={handleCloseFilterModal} />

      <FlatList
        contentContainerStyle={styles.container}
        data={accommodationsList?.data}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <Card
            item={item}
            onLoginRequired={handleLoginRequired}
            onAddedToWishlist={handleAddToWishlist}
            onRemoveFromWishlist={handleRemoveFromWishlist}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No accommodations found!</Text>
          </View>
        }
      />
    </ScreenTemplate>
  );
};

export default Explore;
