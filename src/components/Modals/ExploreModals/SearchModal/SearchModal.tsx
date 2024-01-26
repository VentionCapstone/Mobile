import { useState } from 'react';
import { View } from 'react-native';
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { useSelector } from 'react-redux';
import { ButtonType } from 'src/components/Button';
import Button from 'src/components/Button/Button';
import Collapsable from 'src/components/Collapsable/Collapsable';
import Text from 'src/components/Text/Text';
import ThemedView from 'src/components/ThemedView/ThemedView';
import { PlacesInput } from 'src/components/inputs';
import { getColors } from 'src/store/selectors';
import { BUTTON_SIZES } from 'src/styles';
import { GetAccommodationQueryParams } from 'src/types';
import { getInitialDate } from 'src/utils';

import { styles } from './SearchModal.styles';
import ModalContainer from '../../ModalContainer/ModalContainer';
import { DateTimePicker } from '../../centerModals';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (values: GetAccommodationQueryParams) => void;
};

const SearchModal = ({ visible, onClose, onSelect }: Props) => {
  const colors = useSelector(getColors);
  const [searchValues, setSearchValues] = useState<GetAccommodationQueryParams>({
    location: '',
    checkInDate: '',
    checkOutDate: '',
  });

  const handleSearch = async (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
    if (data) {
      setSearchValues((prevValues) => ({
        ...prevValues,
        location: data.description,
      }));
    }
  };

  const handleSelectFromWhen = (checkInDate: string) => {
    const formattedDate = getInitialDate(checkInDate);

    setSearchValues((prevValues) => ({
      ...prevValues,
      checkInDate: formattedDate,
    }));
  };

  const handleSelectToWhen = (checkOutDate: string) => {
    const formattedDate = getInitialDate(checkOutDate);

    setSearchValues((prevValues) => ({
      ...prevValues,
      checkOutDate: formattedDate,
    }));
  };

  const handleSubmit = () => {
    onSelect(searchValues);
    onClose();
  };

  return (
    <ModalContainer bottomModal visible={visible} onClose={onClose}>
      <ThemedView style={styles.container}>
        <Text style={styles.headerTitle}>Search for Accomodations</Text>

        <View style={styles.inputsContainer}>
          <View style={[styles.where, { backgroundColor: colors.background }]}>
            <Text style={styles.whereTitle}>Where?</Text>

            <PlacesInput onSearch={handleSearch} />
          </View>

          <Collapsable title="From when" subtitle="Never" contentTitle="From which date?">
            <DateTimePicker
              onDateChange={handleSelectFromWhen}
              initialValue={searchValues.checkInDate}
            />
          </Collapsable>

          <Collapsable title="To when" subtitle="Never" contentTitle="To which date?">
            <DateTimePicker
              onDateChange={handleSelectToWhen}
              initialValue={searchValues.checkOutDate}
            />
          </Collapsable>
        </View>
      </ThemedView>

      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <Button title="Clear" type={ButtonType.TERTIARY} onPress={() => {}} />

        <Button title="Search" size={BUTTON_SIZES.MD} onPress={handleSubmit} />
      </View>
    </ModalContainer>
  );
};

export default SearchModal;
