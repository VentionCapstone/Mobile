import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { MyAccommodationListItem, Text, showAlert } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getAccommodationLoader, getMyAccommodations } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { Accommodation } from 'src/types';

import { styles } from './MyAccommodations.style';
import { GREY_300 } from 'src/styles';

const MyAccommodations = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const myAccommodations = useSelector(getMyAccommodations);
  const loader = useSelector(getAccommodationLoader);

  const handleEdit = (accommodation: Accommodation) => {
    navigation.navigate('UpdateAccommodation', { accommodation });
  };

  const handleDelete = async (accommodationId: string) => {
    showAlert('warning', {
      message: 'Are you sure to delete this accommodation?',
      onOkPressed: async () => {
        const response = await dispatch(AsyncThunks.deleteAccommodation(accommodationId));

        if (response.payload.success) {
          fetchMyAccommodations();
        } else {
          showAlert('error', {
            message: 'Failed to delete. Please, try again!',
          });
        }
      },
      onCancelPressed: () => {},
    });
  };

  const fetchMyAccommodations = async () => {
    const response = await dispatch(AsyncThunks.getMyAccommodations());

    if (!response.payload.success) {
      showAlert('error', {
        message: 'Something went wrong!',
      });
    }
  };

  useEffect(() => {
    fetchMyAccommodations();
  }, []);

  return (
    <ScreenTemplate style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} scrollEnabled>
        {loader ? (
          <ActivityIndicator size="large" color={GREY_300} />
        ) : (
          myAccommodations &&
          myAccommodations?.map((acc) => (
            <MyAccommodationListItem
              accommodationDetails={acc}
              onDelete={handleDelete}
              onEdit={handleEdit}
              key={acc.id}
            />
          ))
        )}

        {!loader ||
          (myAccommodations?.length === 0 && (
            <Text style={styles.noAccommodationsText}>You don't have any accommodations!</Text>
          ))}
      </ScrollView>
    </ScreenTemplate>
  );
};

export default MyAccommodations;
