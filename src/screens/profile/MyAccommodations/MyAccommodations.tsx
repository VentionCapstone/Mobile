import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Alert, MyAccommodationListItem, Text, showAlert } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import {
  getAccommodationError,
  getAccommodationLoader,
  getMyAccommodations,
  getMyAccommodationsError,
} from 'src/store/selectors';
import { accommodationActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { GREY_300 } from 'src/styles';
import { Accommodation } from 'src/types';

import { styles } from './MyAccommodations.style';

const MyAccommodations = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const myAccommodations = useSelector(getMyAccommodations);
  const accommodationError = useSelector(getAccommodationError);
  const myAccommodationsError = useSelector(getMyAccommodationsError);
  const loader = useSelector(getAccommodationLoader);
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

  const fetchMyAccommodations = async () => {
    await dispatch(AsyncThunks.getMyAccommodations());
  };

  useEffect(() => {
    dispatch(accommodationActions.clearError());
    if (filteredAccommodations?.length === 0) {
      fetchMyAccommodations();
    }
  }, []);

  useEffect(() => {
    if (accommodationError || myAccommodationsError) {
      setErrorVisible(true);
    }
  }, [accommodationError, myAccommodationsError]);

  return (
    <ScreenTemplate style={styles.container}>
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
    </ScreenTemplate>
  );
};

export default MyAccommodations;
