import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { Icon, Text, ThemedView } from 'src/components';
import { getColors } from 'src/store/selectors';
import { AddressValues, IconName } from 'src/types';
import { GOOGLE_API_KEY } from 'src/utils';

import { styles } from './AddressSelector.style';
import { getCurrentLocation, handlePlaceSelected } from './AddressSelector.utils';
import ModalContainer from '../../ModalContainer/ModalContainer';

interface Props {
  onSelect: (values: AddressValues) => void;
}

const AddressSelector = ({ onSelect }: Props) => {
  const colors = useSelector(getColors);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);

  const latitude = currentLocation?.coords.latitude || 0;
  const longitude = currentLocation?.coords.longitude || 0;

  const [addressValues, setAddressValues] = useState<AddressValues>({
    country: '',
    city: '',
    street: '',
    zipCode: '',
    longitude,
    latitude,
  });

  const initialRegion: Region = {
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleSearch = async (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
    handlePlaceSelected(data, details, setAddressValues, onSelect);
  };

  useEffect(() => {
    getCurrentLocation().then((location) => {
      setCurrentLocation(location);
    });
  }, []);

  return (
    <ThemedView>
      <TouchableOpacity
        style={[styles.addressLabel, { backgroundColor: colors.secondaryBackground }]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.row}>
          <Icon name={IconName.Location} size={26} color={colors.placeholder} />
          <Text style={[styles.labelText, { color: colors.placeholder }]}>location</Text>
        </View>

        <Icon name={IconName.ChevronForward} />
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
            placeholder="Search"
            onPress={handleSearch}
            query={{
              key: GOOGLE_API_KEY,
              language: 'en',
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
              title="Me"
            />
          )}
        </MapView>

        <View style={styles.addressContainer}>
          <View style={styles.addressDescriptionContainer}>
            <Icon name={IconName.Location} />
            <Text style={styles.label}>Address</Text>
          </View>
        </View>
      </ModalContainer>
    </ThemedView>
  );
};

export default AddressSelector;
