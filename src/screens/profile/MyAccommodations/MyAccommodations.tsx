import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { MyAccommodationListItem, showAlert } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { AsyncThunks } from 'src/store/thunks';
import { Accommodation } from 'src/types';

import { styles } from './MyAccommodations.style';

const MyAccommodations = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const data: Accommodation[] = [
    {
      id: '35d36190-9d66-4fd7-957f-3945ddadf65f',
      thumbnailUrl:
        'https://www.tourismni.com/globalassets/business-development/quality-and-standards/accommodation-stats-main-image.jpg',
      previewImgUrl: 'string',
      squareMeters: 0,
      numberOfRooms: 0,
      price: 200,
      availability: true,
      availableFrom: '2023-12-17T13:12:41.165Z',
      availableTo: '2023-12-17T13:12:41.165Z',
      description: 'string',
      Address: {
        addressId: '12123',
        street: 'Mirtemir',
        city: 'Samarkand',
        country: 'Uzbekistan',
        zipCode: 'string',
        latitude: 0,
        longitude: 0,
      },
    },
  ];

  const handleEdit = (accommodationId: string) => {
    navigation.navigate('UpdateAccommodation', { accommodationId });
  };

  const handleDelete = async (accommodationId: string) => {
    const response = await dispatch(AsyncThunks.deleteAccommodation(accommodationId));

    if (!response.payload.error) {
      showAlert('success', {
        message: 'Acommodation deleted successfully!',
      });
    } else {
      showAlert('error', {
        message: 'Failed to delete. Please, try again!',
      });
    }
  };

  return (
    <ScreenTemplate style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {data.map((acc) => (
          <MyAccommodationListItem
            accommodationDetails={acc}
            onDelete={handleDelete}
            onEdit={handleEdit}
            key={acc.id}
          />
        ))}
      </ScrollView>
    </ScreenTemplate>
  );
};

export default MyAccommodations;
