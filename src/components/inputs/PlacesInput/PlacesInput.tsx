import { View } from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';
import { IconName } from 'src/types';
import { GOOGLE_API_KEY } from 'src/utils';

import { styles } from './PlacesInput.styles';
import Icon from '../../Icon/Icon';

type Props = {
  onSearch: (data: GooglePlaceData, details: GooglePlaceDetail | null) => void;
};

const PlacesInput = ({ onSearch }: Props) => {
  const colors = useSelector(getColors);

  return (
    <View>
      <Icon name={IconName.Search} style={styles.searchIcon} />

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
        placeholder="Search for location..."
        onPress={onSearch}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
          // components: 'country:uz|country:kz|country:ru',
          types: ['(cities)'],
        }}
        enablePoweredByContainer={false}
      />
    </View>
  );
};

export default PlacesInput;
