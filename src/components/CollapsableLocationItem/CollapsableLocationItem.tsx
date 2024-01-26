import React from 'react'
import { View, TouchableOpacity } from 'react-native';
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { DEFAULT_LOCATION } from 'src/constants/constantLabels';
import Collapsable from '../Collapsable/Collapsable';
import { GOOGLE_API_KEY } from '../modals/bottomModals/AddressSelector/AddressSelector.utils';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';
import Text from 'src/components/Text/Text';
import { styles } from './CollapsableLocationItem.styles';

type CollapsableLocationItemProps = {
  title: string,
  location: string,
  stateToggleCollapsed: boolean,
  toggleLocationCollapse: () => void,
  handleAutocompleteSearch: (data: GooglePlaceData, details: GooglePlaceDetail | null) => Promise<void>,
  clearLocation: () => void
};

export const CollapsableLocationItem = ({
  title,
  location,
  stateToggleCollapsed,
  toggleLocationCollapse,
  handleAutocompleteSearch,
  clearLocation
}: CollapsableLocationItemProps) => {
  const colors = useSelector(getColors);

  return (
    <Collapsable
    title={title}
    subtitle={location ? location : DEFAULT_LOCATION}
    contentTitle="Pick your next destination"
    collapsed={stateToggleCollapsed}
    onTouch={toggleLocationCollapse}>
    <View>
      <GooglePlacesAutocomplete
        styles={{
          textInput: [
            styles.searchInput,
          ],
          listView: [styles.placesInputListView, { backgroundColor: colors.background }],
        }}
        textInputProps={{
          placeholderTextColor: colors.placeholder,
          selectionColor: colors.tint,
          editable: true,
        }}
        placeholder={location ? location : "Search for location"}
        onPress={handleAutocompleteSearch}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
          types: '(cities)',
        }} />
      <TouchableOpacity onPress={clearLocation}>
        <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  </Collapsable>);
}