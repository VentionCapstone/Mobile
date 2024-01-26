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
import { DEFAULT_FILTER_VALUES } from 'src/constants/filter';
import { useAppDispatch } from 'src/store';
import { getColors, getSearchParams } from 'src/store/selectors';
import { accommodationListActions } from 'src/store/slices';
import { BUTTON_SIZES } from 'src/styles';
import { GetAccommodationQueryParams } from 'src/types';
import { getInitialDate } from 'src/utils';

import { styles } from './SearchModal.styles';
import ModalContainer from '../../ModalContainer/ModalContainer';
import { DateTimePicker } from '../../centerModals';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const SearchModal = ({ visible, onClose }: Props) => {
  const colors = useSelector(getColors);
  const dispatch = useAppDispatch();
  const searchParams = useSelector(getSearchParams);

  const [searchValues, setSearchValues] = useState<GetAccommodationQueryParams>({
    location: searchParams.location,
    checkInDate: searchParams.checkInDate,
    checkOutDate: searchParams.checkOutDate,
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
    dispatch(
      accommodationListActions.setSearchParams({
        ...searchParams,
        ...searchValues,
      })
    );
    onClose();
  };

  const handleResetSearch = () => {
    dispatch(accommodationListActions.resetSearch());
    setSearchValues(DEFAULT_FILTER_VALUES);
  };

  return (
    <ModalContainer bottomModal visible={visible} onClose={onClose}>
      <ThemedView style={styles.container}>
        <Text style={styles.headerTitle}>Search for Accomodations</Text>

        <View style={styles.inputsContainer}>
          <View style={[styles.where, { backgroundColor: colors.background }]}>
            <View>
              <Text style={styles.whereTitle}>Where?</Text>
              <Text>{searchValues.location}</Text>
            </View>

            <PlacesInput onSearch={handleSearch} />
          </View>

          <Collapsable
            title="From when"
            subtitle={searchValues.checkInDate?.toString()}
            contentTitle="From which date?"
          >
            <DateTimePicker
              onDateChange={handleSelectFromWhen}
              initialValue={searchValues.checkInDate}
              maxDate={searchValues.checkOutDate || undefined}
            />
          </Collapsable>

          <Collapsable
            title="To when"
            subtitle={searchValues.checkOutDate?.toString()}
            contentTitle="To which date?"
          >
            <DateTimePicker
              onDateChange={handleSelectToWhen}
              initialValue={searchValues.checkOutDate}
              minDate={searchValues.checkInDate || undefined}
            />
          </Collapsable>
        </View>
      </ThemedView>

      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <Button title="Clear" type={ButtonType.TERTIARY} onPress={handleResetSearch} />

        <Button title="Search" size={BUTTON_SIZES.MD} onPress={handleSubmit} />
      </View>
    </ModalContainer>
  );
};

export default SearchModal;
