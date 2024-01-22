import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, MyAccommodationListItem, Text, showAlert } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import {
  getAccommodationLoader,
  getIsGuestAccount,
  getMyAccommodations,
  getMyAccommodationsLoader,
  getUserId,
} from 'src/store/selectors';
import { accommodationActions, myAccommodationsListActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { GREY_300 } from 'src/styles';
import { Accommodation } from 'src/types';

import { styles } from './MyAccommodations.style';

const MyAccommodations = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const myAccommodations = useSelector(getMyAccommodations);
  const isGuestAccount = useSelector(getIsGuestAccount);
  const accommodationLoader = useSelector(getAccommodationLoader);
  const myAccommodationsLoader = useSelector(getMyAccommodationsLoader);
  const userId = useSelector(getUserId);

  const [refreshing, setRefreshing] = useState(false);

  const filteredAccommodations = useMemo(
    () => myAccommodations?.filter((acc) => !acc.isDeleted) || [],
    [myAccommodations]
  );

  const handleEdit = (accommodation: Accommodation) => {
    navigation.navigate('UpdateAccommodation', { accommodation });
  };

  const handleDelete = async (accommodationId: string) => {
    showAlert('warning', {
      message: 'Are you sure to delete this accommodation?',
      onOkPressed: async () => {
        await dispatch(AsyncThunks.deleteAccommodation(accommodationId));
      },
      onCancelPressed: () => {},
    });
  };

  const navigateToCreateAccount = () => {
    navigation.navigate('CreateProfile');
  };

  const fetchMyAccommodations = async () => {
    if (userId) {
      await dispatch(AsyncThunks.getMyAccommodations(userId));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMyAccommodations();
    setRefreshing(false);
  };

  useEffect(() => {
    dispatch(accommodationActions.clearError());
    dispatch(myAccommodationsListActions.clearError());
    fetchMyAccommodations();
  }, []);

  return (
    <ScreenTemplate style={styles.container}>
      {isGuestAccount && (
        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccountTitle}>You haven't created your account yet</Text>
          <Button title="Create Account" onPress={navigateToCreateAccount} />
        </View>
      )}

      {!isGuestAccount && (
        <>
          {myAccommodationsLoader ? (
            <ActivityIndicator size="large" color={GREY_300} style={styles.loader} />
          ) : (
            <FlatList
              data={filteredAccommodations}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[GREY_300]} />
              }
              ListEmptyComponent={() => (
                <Text style={styles.noAccommodationsText}>You don't have any accommodations!</Text>
              )}
              renderItem={({ item }) => (
                <MyAccommodationListItem
                  accommodationDetails={item}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  loader={accommodationLoader}
                />
              )}
              contentContainerStyle={styles.flatlist}
            />
          )}
        </>
      )}
    </ScreenTemplate>
  );
};

export default MyAccommodations;
