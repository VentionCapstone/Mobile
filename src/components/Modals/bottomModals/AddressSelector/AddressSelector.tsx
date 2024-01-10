import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';
import { AddressValues, IconName } from 'src/types';

import { styles } from './AddressSelector.style';
import {
  GOOGLE_API_KEY,
  REGION_DELTA,
  getAddressInfo,
  getPlaceDetails,
  validateForm,
} from './AddressSelector.utils';
import AddressSelectorForm from './AddressSelectorForm';
import Icon from '../../../Icon/Icon';
import Text from '../../../Text/Text';
import ThemedView from '../../../ThemedView/ThemedView';
import showAlert from '../../../alert';
import ModalContainer from '../../ModalContainer/ModalContainer';

interface Props {
  onSelect: (values: AddressValues) => void;
  existingAddress?: AddressValues;
}

const initialAddressValues: AddressValues = {
  country: '',
  city: '',
  street: '',
  zipCode: '',
  latitude: null,
  longitude: null,
};

const AddressSelector = ({ onSelect, existingAddress }: Props) => {
  const colors = useSelector(getColors);

  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [addressSelected, setAddressSelected] = useState<boolean>(false);
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<LatLng | null>(null);

  const [addressValues, setAddressValues] = useState<AddressValues>(
    existingAddress || initialAddressValues
  );

  const formIsValid = useMemo(
    () => !Object.values(validationErrors).some((error) => error.trim() !== ''),
    [validationErrors]
  );

  const handleInputChange = useCallback((fieldName: keyof AddressValues, text: string) => {
    setAddressValues((prevValues) => ({
      ...prevValues,
      [fieldName]: text,
    }));
  }, []);

  const handleSearch = useCallback(
    async (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
      if (details) {
        const placeDetails = await getPlaceDetails(details.place_id);

        if (!placeDetails) {
          showAlert('error', {
            message: 'Something went wrong!',
          });
          return;
        }

        const { city, country, latitude, longitude } = getAddressInfo({
          placeDetails,
        });

        setSelectedCoordinates({ latitude, longitude });
        setMapRegion({
          latitude,
          longitude,
          latitudeDelta: REGION_DELTA,
          longitudeDelta: REGION_DELTA,
        });

        setAddressValues({
          ...addressValues,
          city,
          country,
          longitude,
          latitude,
        });

        setAddressSelected(true);
      }
    },
    [addressValues]
  );

  const handleOnSave = useCallback(async () => {
    setFormInteracted(true);
    const errors = validateForm(addressValues);

    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      return;
    }

    if (Object.keys(errors).length === 0) {
      onSelect(addressValues);
      setModalVisible(false);
    }
  }, [addressValues, onSelect]);

  useEffect(() => {
    if (formInteracted) {
      const errors = validateForm(addressValues);
      setValidationErrors(errors);
    }
  }, [addressValues, formInteracted]);

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
            borderColor: 'transparent',
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.row}>
          <Icon name={IconName.Location} size={26} color={colors.placeholder} />
          <Text style={[styles.labelText, { color: colors.placeholder }]}>
            {addressValues.city && addressValues.street
              ? `${addressValues.city}, ${addressValues.country}`
              : 'location'}
          </Text>
        </View>

        <Icon name={IconName.ChevronForward} color={colors.placeholder} />
      </TouchableOpacity>

      <ModalContainer bottomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <View
          style={[
            styles.searchInputContainer,
            { height: addressSelected || existingAddress ? 80 : 300 },
          ]}
        >
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
            }}
            placeholder="Search for address..."
            onPress={handleSearch}
            query={{
              key: GOOGLE_API_KEY,
              language: 'en',
              components: 'country:uz|country:kz|country:ru',
              types: ['(cities)'],
            }}
          />
        </View>

        <ScrollView>
          {selectedCoordinates && mapRegion && (
            <MapView style={styles.mapContainer} provider={PROVIDER_GOOGLE} region={mapRegion}>
              <Marker coordinate={selectedCoordinates} title="here" />
            </MapView>
          )}

          {(addressSelected || existingAddress) && (
            <AddressSelectorForm
              onInputChange={handleInputChange}
              addressValues={addressValues}
              validationErrors={validationErrors}
              onSave={handleOnSave}
              formIsValid={formIsValid}
            />
          )}
        </ScrollView>
      </ModalContainer>
    </ThemedView>
  );
};

export default AddressSelector;
