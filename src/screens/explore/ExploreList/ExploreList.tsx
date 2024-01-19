import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Card } from 'src/components';
import { useAppDispatch } from 'src/store';
import { getFilterSettings } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { AdressListingValues } from 'src/types';
import { getAccommodationsListQuery } from 'src/utils';

interface CardProps {
  id: string;
  thumbnailUrl: string;
  squareMeters: number;
  numberOfRooms: number;
  allowedNumberOfPeople: number;
  price: number;
  address: AdressListingValues;
}

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
    setPageNumber(1);
    fetchData();
  }, [fetchData]);

  const handleLoadMore = useCallback(() => {
    if (!loading) {
      setPageNumber((prevPage) => prevPage + 1);
      fetchData();
    }
  }, [loading, fetchData]);

  const renderCards = useMemo<JSX.Element[]>(() => {
    return data.map((item, index) => (
      <Card
        key={index}
        id={item.id}
        thumbnailUrl={item.thumbnailUrl}
        squareMeters={item.squareMeters}
        numberOfRooms={item.numberOfRooms}
        allowedNumberOfPeople={item.allowedNumberOfPeople}
        price={item.price}
        address={item.address}
      />
    ));
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [fetchData, filter]);

  return (
    <ScrollView
      style={[styles.container, style]}
      onScrollEndDrag={handleLoadMore}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
    >
      <Card
        id="123456"
        thumbnailUrl="https://example.com/image.jpg"
        squareMeters={100}
        numberOfRooms={3}
        allowedNumberOfPeople={4}
        price={2000}
        address={{
          street: '123 Main St',
          city: 'City',
          country: 'Country',
        }}
      />
      {loading && <ActivityIndicator style={styles.loading} />}
      {renderCards}
      <View style={{ height: 40 }} />
    </ScrollView>
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
