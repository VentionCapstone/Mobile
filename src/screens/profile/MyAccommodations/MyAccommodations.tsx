import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Alert, Button, MyAccommodationListItem, Text, showAlert } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import {
  getAccommodationError,
  getAccommodationLoader,
  getIsGuestAccount,
  getMyAccommodations,
  getMyAccommodationsError,
  getUserId,
} from 'src/store/selectors';
import { accommodationActions, myAccommodationsListActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { GREY_300 } from 'src/styles';
import { Accommodation } from 'src/types';

import { styles } from './MyAccommodations.style';

const MyAccommodations = () => {
  const dispatch = useAppDispatch();
  const accommodationError = useSelector(getAccommodationError);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const myAccommodationsError = useSelector(getMyAccommodationsError);
  const myAccommodations = useSelector(getMyAccommodations);
  const isGuestAccount = useSelector(getIsGuestAccount);
  const loader = useSelector(getAccommodationLoader);
  const userId = useSelector(getUserId);
  const [errorVisible, setErrorVisible] = useState(false);

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

  useEffect(() => {
    dispatch(accommodationActions.clearError());
    dispatch(myAccommodationsListActions.clearError());
    fetchMyAccommodations();
  }, []);

  useEffect(() => {
    if (accommodationError || myAccommodationsError) {
      setErrorVisible(true);
    }
  }, [accommodationError, myAccommodationsError]);

  return (
    <ScreenTemplate style={styles.container}>
      {isGuestAccount && (
        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccountTitle}>You haven't created your account yet</Text>
          <Button title="Create Account" onPress={navigateToCreateAccount} />
        </View>
      )}

      {!isGuestAccount && (
        <ScrollView contentContainerStyle={styles.scrollContainer} scrollEnabled>
          {loader ? (
            <ActivityIndicator size="large" color={GREY_300} />
          ) : (
            filteredAccommodations?.map((acc) => (
              <MyAccommodationListItem
                accommodationDetails={acc}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loader={loader}
                key={acc.id}
              />
            ))
          )}

          {!loader && filteredAccommodations?.length === 0 && (
            <Text style={styles.noAccommodationsText}>You don't have any accommodations!</Text>
          )}

          <Alert
            visible={errorVisible}
            message={accommodationError?.error.message || myAccommodationsError?.error.message}
            onClose={() => setErrorVisible(false)}
          />
        </ScrollView>
      )}
    </ScreenTemplate>
  );
};

export default MyAccommodations;
