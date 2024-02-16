import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Card, ExploreHeader, FilterModal, SearchModal, Text, showToast } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { useAppDispatch } from 'src/store';
import {
  getAccommodationList,
  getAccommodationListLoading,
  getColors,
  getFilterParams,
  getSearchParams,
} from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';

import styles from './Explore.style';

const Explore = () => {
  const dispatch = useAppDispatch();
  const colors = useSelector(getColors);
  const accommodationsList = useSelector(getAccommodationList);
  const isLoading = useSelector(getAccommodationListLoading);
  const filterParams = useSelector(getFilterParams);
  const searchParams = useSelector(getSearchParams);

  const [page, setPage] = useState(1);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  const flatListRef = useRef<FlatList | null>(null);

  const fetchAccommodationList = useCallback(async () => {
    await dispatch(
      AsyncThunks.getListOfAccommodations({ page, limit: 10, ...filterParams, ...searchParams })
    );
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
    showToast({ type: 'info', text1: 'You should be logged in to add your wishlists' });
  }, []);

  useEffect(() => {
    setPage(1);
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }, [filterParams, searchParams]);

  useEffect(() => {
    fetchAccommodationList();
  }, [page, fetchAccommodationList]);

  return (
    <ScreenTemplate headerShown={false}>
      <ExploreHeader
        onOpenSearchModal={handleOpenSearchModal}
        onOpenFilterModal={handleOpenFilterModal}
      />

      <SearchModal visible={isSearchVisible} onClose={handleCloseSearchModal} />
      <FilterModal visible={isFilterVisible} onClose={handleCloseFilterModal} />

      <FlatList
        ref={(ref) => (flatListRef.current = ref)}
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
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            progressBackgroundColor={colors.background}
            colors={[colors.tint]}
          />
        }
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
