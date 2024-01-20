import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, RefreshControl, StyleProp, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { Card } from 'src/components';
import { useAppDispatch } from 'src/store';
import { getFilterSettings } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { ExploreListItem } from 'src/types';
import { getAccommodationsListQuery } from 'src/utils';

interface CardProps extends ExploreListItem {}

interface ExploreListProps {
  style: StyleProp<ViewStyle>;
}

const ExploreList = ({ style }: ExploreListProps) => {
  const dispatch = useAppDispatch();
  const filter = useSelector(getFilterSettings);
  const [data, setData] = useState<CardProps[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await dispatch(
        AsyncThunks.getListOfAccommodations(
          getAccommodationsListQuery({ ...filter, page: pageNumber })
        )
      );
      if (response.payload?.success) {
        setData((prevData) => [...prevData, ...(response.payload?.data as CardProps[])]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [filter, pageNumber, dispatch]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setData([]);
    setPageNumber(1);
    fetchData();
  }, [fetchData]);

  const handleLoadMore = useCallback(() => {
    if (!loading) {
      console.log('loadMore');
      setPageNumber((prevPage) => prevPage + 1);
      fetchData();
    }
  }, [loading, fetchData]);

  const keyExtractor = useCallback((item: CardProps) => item.id, []);

  const renderItem = useMemo(
    () =>
      ({ item }: { item: CardProps }) => (
        <Card
          id={item.id}
          thumbnailUrl={item.thumbnailUrl}
          squareMeters={item.squareMeters}
          numberOfRooms={item.numberOfRooms}
          allowedNumberOfPeople={item.allowedNumberOfPeople}
          price={item.price}
          address={item.address}
        />
      ),
    []
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleRefresh();
  }, [filter]);

  return (
    <FlatList
      style={[styles.container, style]}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  loading: {
    marginVertical: 20,
  },
});

export default ExploreList;
