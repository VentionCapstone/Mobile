import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCallback, useState, useRef, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { Icon, Text } from 'src/components';
import showAlert from 'src/components/alert';
import {
  getAddressInfo,
  getPlaceDetails,
} from 'src/components/modals/bottomModals/AddressSelector/AddressSelector.utils';
import { StepperTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { getColors } from 'src/store/selectors';
import { AddressValues, IconName } from 'src/types';

import { styles } from './AccommodationAddress.style';
import { GOOGLE_API_KEY, INITIAL_COORDINATES } from './AccommodationAddress.utils';
import AccommodationAddressForm from './AccommodationAddressForm';

const AccommodationAddress = () => {
  const colors = useSelector(getColors);
  const mapViewRef = useRef<MapView>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [addressSelected, setAddressSelected] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState<LatLng | undefined>(
    INITIAL_COORDINATES
  );
  const [addressValues, setAddressValues] = useState<AddressValues>({
    country: '',
    city: '',
    street: '',
    zipCode: '',
    latitude: null,
    longitude: null,
  });

  const handleInputChange = useCallback((fieldName: keyof AddressValues, text: string) => {
    setAddressValues((prevValues) => ({ ...prevValues, [fieldName]: text }));
  }, []);

  const handleSearch = useCallback(
    async (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
      if (details) {
        const placeDetails = await getPlaceDetails(details.place_id);

        if (!placeDetails) {
          showAlert('error', { message: 'Something went wrong!' });
          return;
        }

        const { city, country, latitude, longitude } = getAddressInfo({ placeDetails });
        setSelectedCoordinates({ latitude, longitude });
        setAddressValues({ ...addressValues, city, country, longitude, latitude });
        setAddressSelected(true);
      }
    },
    [addressValues]
  );

  const handleNext = useCallback(async () => {
    const accommodation = { address: addressValues };

    navigation.navigate('AccommodationInfos', { accommodation });
  }, [navigation, addressValues]);

  useEffect(() => {
    if (selectedCoordinates) {
      mapViewRef.current?.animateToRegion(
        {
          latitude: selectedCoordinates.latitude,
          longitude: selectedCoordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      );
    }
  }, [selectedCoordinates]);

  const isNextButtonDisabled = Object.values(addressValues).some((value) => value === '' || null);

  return (
    <StepperTemplate
      onNext={handleNext}
      disableNextButton={!addressSelected || isNextButtonDisabled}
      displayPrevButton={false}
    >
      <View style={styles.placesInputContainer}>
        {!addressSelected && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Where is your house located?</Text>
            <Text style={styles.subtitle}>
              Your address is only shared with guests after they've made a reservation
            </Text>
          </View>
        )}

        <View style={styles.inputInnerContainer}>
          <GooglePlacesAutocomplete
            styles={{
              textInput: [
                styles.searchInput,
                { backgroundColor: colors.secondaryBackground, color: colors.text },
              ],
              listView: [styles.placesInputListView, { backgroundColor: colors.background }],
            }}
            textInputProps={{
              placeholderTextColor: colors.placeholder,
              selectionColor: colors.tint,
              scrollEnabled: true,
              editable: true,
            }}
            placeholder="Enter your address"
            onPress={handleSearch}
            query={{
              key: GOOGLE_API_KEY,
              language: 'en',
              components: 'country:uz|country:kz|country:ru',
              types: ['(cities)'],
            }}
          />

          <Icon name={IconName.SearchOutline} style={styles.locationIcon} />
        </View>
      </View>

      {addressSelected && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <MapView
            ref={mapViewRef}
            style={styles.mapContainer}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: selectedCoordinates?.latitude || INITIAL_COORDINATES.latitude,
              longitude: selectedCoordinates?.longitude || INITIAL_COORDINATES.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {selectedCoordinates && <Marker coordinate={selectedCoordinates} title="here" />}
          </MapView>

          <AccommodationAddressForm
            addressValues={addressValues}
            onInputChange={handleInputChange}
          />
        </ScrollView>
      )}
    </StepperTemplate>
  );
};

export default AccommodationAddress;
