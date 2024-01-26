import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { Card } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { useAppDispatch } from 'src/store';
import {
  getAccommodationList,
  getAccommodationListLoading,
  getFilterSettings,
} from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { ExploreListItem } from 'src/types';

interface CardProps extends ExploreListItem {}

const Explore = () => {
  const dispatch = useAppDispatch();
  const filter = useSelector(getFilterSettings);
  const data = useSelector(getAccommodationList);
  const pending = useSelector(getAccommodationListLoading);
  const { t } = useTranslation();

  const [pageNumber, setPageNumber] = useState<number>(1);

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

  const fetchData = useCallback(async () => {
    await dispatch(AsyncThunks.getListOfAccommodations({ ...filter, page: pageNumber }));
  }, [filter, pageNumber, dispatch]);

  const handleRefresh = useCallback(() => {
    setPageNumber(1);
    fetchData();
  }, [fetchData]);

  const handleLoadMore = useCallback(() => {
    if (!pending) {
      setPageNumber((prevPage) => prevPage + 1);
      dispatch(AsyncThunks.getUpdatedListOfAccommodations({ ...filter, page: pageNumber }));
    }
  }, [pending, filter, pageNumber, dispatch]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleRefresh();
  }, [filter, handleRefresh]);

  return (
    <ScreenTemplate>
      <FlatList
        style={[styles.container]}
        data={data}
        keyExtractor={(item: CardProps) => item.id}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        refreshControl={<RefreshControl refreshing={pending} onRefresh={handleRefresh} />}
      />
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: 800,
    alignSelf: 'center',
    width: '95%',
    padding: 10,
  },
  loading: {
    marginVertical: 20,
  },
  emptySpace: {
    height: 80,
  },
});

export default Explore;
