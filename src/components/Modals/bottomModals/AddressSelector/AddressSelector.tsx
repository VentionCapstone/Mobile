import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { Button, Icon, Text, ThemedView, showAlert } from 'src/components';
import { Input } from 'src/components/inputs';
import { getColors } from 'src/store/selectors';
import { RED_200 } from 'src/styles';
import { AddressValues, IconName } from 'src/types';
import { ADDRESS_INFO_MAX_LENGTH, ADDRESS_ZIPCODE_MAX_LENGTH } from 'src/utils';

import { styles } from './AddressSelector.style';
import {
  getAddressInfo,
  getCoordinatesByCity,
  getCurrentLocation,
  validateForm,
} from './AddressSelector.utils';
import ModalContainer from '../../ModalContainer/ModalContainer';

interface Props {
  onSelect: (values: AddressValues) => void;
  addressError: boolean;
  setAddressError: (value: boolean) => void;
  existingAddress?: AddressValues;
}

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY ?? '';

const AddressSelector = ({ onSelect, addressError, setAddressError, existingAddress }: Props) => {
  const colors = useSelector(getColors);
  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);

  const initialLatitude = currentLocation?.coords.latitude || 0;
  const initialLongitude = currentLocation?.coords.longitude || 0;

  const initialAddressValues: AddressValues = {
    country: '',
    city: '',
    street: '',
    zipCode: '',
    latitude: null,
    longitude: null,
  };

  const [addressValues, setAddressValues] = useState<AddressValues>(
    existingAddress || initialAddressValues
  );

  const { country, city, street, zipCode } = addressValues;
  const formIsValid = !Object.values(validationErrors).some((error) => error.trim() !== '');

  const [initialRegion, setInitialRegion] = useState<Region>({
    latitude: initialLatitude,
    longitude: initialLongitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleInputChange = (fieldName: keyof AddressValues, text: string) => {
    setAddressValues((prevValues) => ({
      ...prevValues,
      [fieldName]: text,
    }));
  };

  const handleSearch = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
    if (details) {
      const { city, country, longitude, latitude } = getAddressInfo(
        details,
        initialLatitude,
        initialLongitude
      );

      setAddressValues({
        ...addressValues,
        city,
        country,
        longitude,
        latitude,
      });
    }
  };

  const handleOnSave = async () => {
    setFormInteracted(true);
    const errors = validateForm(addressValues);

    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      return;
    }

    if (Object.keys(errors).length === 0) {
      if (addressValues.latitude && addressValues.longitude) {
        onSelect(addressValues);
        setAddressError(false);
        return;
      }

      const coordinates = await getCoordinatesByCity(city);
      if (coordinates) {
        onSelect({
          ...addressValues,
          latitude: coordinates.latitude || initialLatitude,
          longitude: coordinates.longitude || initialLongitude,
        });
        setModalVisible(false);
      }

      if (!coordinates) {
        showAlert('error', {
          message: 'Something went wrong! try again later',
        });
      }
    }
  };

  useEffect(() => {
    if (formInteracted) {
      const errors = validateForm(addressValues);
      setValidationErrors(errors);
    }
  }, [addressValues]);

  useEffect(() => {
    getCurrentLocation().then((location) => {
      setCurrentLocation(location);
      setInitialRegion((prevRegion) => ({
        ...prevRegion,
        latitude: location?.coords.latitude || prevRegion.latitude,
        longitude: location?.coords.longitude || prevRegion.longitude,
      }));
    });
  }, []);

  useEffect(() => {
    setAddressValues(existingAddress || initialAddressValues);
  }, [existingAddress]);

  return (
    <ThemedView>
      <TouchableOpacity
        style={[
          styles.addressLabel,
          {
            backgroundColor: colors.secondaryBackground,
            borderColor: addressError ? RED_200 : 'transparent',
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.row}>
          <Icon
            name={IconName.Location}
            size={26}
            color={addressError ? RED_200 : colors.placeholder}
          />
          <Text style={[styles.labelText, { color: addressError ? RED_200 : colors.placeholder }]}>
            {city && street ? `${city}, ${country}` : 'location'}
          </Text>
        </View>

        <Icon name={IconName.ChevronForward} color={addressError ? RED_200 : colors.placeholder} />
      </TouchableOpacity>

      <ModalContainer bottomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <View style={styles.searchInputContainer}>
          <GooglePlacesAutocomplete
            styles={{
              textInput: [
                styles.searchInput,
                { backgroundColor: colors.secondaryBackground, color: colors.text },
              ],
            }}
            textInputProps={{
              placeholderTextColor: colors.placeholder,
            }}
            placeholder="Search"
            onPress={handleSearch}
            query={{
              key: GOOGLE_API_KEY,
              language: 'en',
              components: 'country:uz|country:kz|country:ru',
              types: ['(cities)'],
            }}
          />
        </View>

        <MapView style={styles.mapContainer} region={initialRegion} provider={PROVIDER_GOOGLE}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
              }}
              title="here"
            />
          )}
        </MapView>

        <ScrollView contentContainerStyle={styles.addressContainer}>
          <View style={styles.addressDescriptionContainer}>
            <Icon name={IconName.Location} />
            <Text style={styles.label}>Address</Text>
          </View>

          <Input
            label="Country"
            placeholder="enter country"
            value={country}
            maxLength={ADDRESS_INFO_MAX_LENGTH}
            onChangeText={(text: string) => handleInputChange('country', text)}
            error={validationErrors.country}
          />
          <Input
            label="City"
            placeholder="enter city"
            value={city}
            maxLength={ADDRESS_INFO_MAX_LENGTH}
            onChangeText={(text: string) => handleInputChange('city', text)}
            error={validationErrors.city}
          />
          <Input
            label="Street"
            placeholder="enter street"
            value={street}
            maxLength={ADDRESS_INFO_MAX_LENGTH}
            onChangeText={(text: string) => handleInputChange('street', text)}
            error={validationErrors.street}
          />
          <Input
            label="Zip code"
            placeholder="enter zip code"
            value={zipCode}
            keyboardType="numeric"
            maxLength={ADDRESS_ZIPCODE_MAX_LENGTH}
            onChangeText={(text: string) => handleInputChange('zipCode', text)}
            error={validationErrors.zipCode}
          />

          <Button
            title="Save"
            onPress={handleOnSave}
            style={styles.saveButton}
            marginVertical={30}
            disabled={!formIsValid}
          />
        </ScrollView>
      </ModalContainer>
    </ThemedView>
  );
};

export default AddressSelector;
