import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { FlatList, Modal, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { getToday } from 'react-native-modern-datepicker';
import { useSelector } from 'react-redux';
import Button from 'src/components/Button/Button';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import ThemedView from 'src/components/ThemedView/ThemedView';
import { getColors, getFilterSettings } from 'src/store/selectors';
import { BLACK, BUTTON_SIZES, LEVEL_1, WHITE, WHITE_100 } from 'src/styles';
import { IconName, SearchValues } from 'src/types';
import { styles } from './SearchModal.styles';
import { formatLocationString, getNextDay, getPlaceDetails, isInvalidDateRange } from './SearchModal.utils';
import { useAppDispatch } from 'src/store';
import { accommodationListActions } from 'src/store/slices';
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import showAlert from 'src/components/alert';
import { searchSlice } from 'src/store/slices/searchSlice';
import { CollapsableLocationItem } from 'src/components/CollapsableLocationItem/CollapsableLocationItem';
import { CollapsableDatePicker } from 'src/components/CollapsableDatePicker/CollapsableDatePicker';

type ExploreModalProps = {
  modalOpen: boolean;
  changeOpen: () => void;
};

const SearchModal = ({ modalOpen, changeOpen }: ExploreModalProps) => {
  const colors = useSelector(getColors);
  const dispatch = useAppDispatch();
  const filter = useSelector(getFilterSettings);
  const [location, setLocation] = useState(filter.location ? filter.location : "")
  const [checkInDate, setcheckInDate] = useState(filter.checkInDate ? filter.checkInDate : "")
  const [checkOutDate, setcheckOutDate] = useState(filter.checkOutDate ? filter.checkOutDate : "")
  const [formValues, setFormValues] = useState<SearchValues>({ ...filter, location, checkInDate, checkOutDate });

  useEffect(() => {
    setFormValues({ ...filter, location, checkInDate, checkOutDate });
  }, [filter, location, checkInDate, checkOutDate]);

  const handleGooglePlacesSearch = useCallback(
    async (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
      if (details) {
        const placeDetails = await getPlaceDetails(details.place_id);

        if (!placeDetails) {
          showAlert('error', { message: 'Something went wrong!' });
          return;
        }
        const formattedLocation = formatLocationString(placeDetails.formatted_address);
        setLocation(formattedLocation)
      }
    },
    [getPlaceDetails, formatLocationString, setLocation]
  );

  const handleCheckInChange = useCallback(
    (newDate: string) => {
      setcheckInDate(newDate);
    },
    [setcheckInDate]
  );

  const handleCheckOutChange = useCallback(
    (newDate: string) => {
      setcheckOutDate(newDate);
    },
    [setcheckOutDate]
  );

  const getCheckOutMinDate = useCallback(() => {
    const checkoutMin = checkInDate ? getNextDay(checkInDate) : getNextDay(getToday());
    return checkoutMin;
  }, [checkInDate, getNextDay, getToday]);

  const getCheckInMinDate = useCallback(() => {
    const today = getToday();
    return today;
  }, [getToday]);

  const clearCheckin = useCallback(() => {
    setcheckInDate('');
    }, [setcheckInDate]);
  
  const clearCheckout = useCallback(() => {
    setcheckOutDate('');
  }, [setcheckOutDate]);

  const clearLocation = useCallback(() => {
    setLocation('');
  }, [setLocation]);

  const handleSearch = useCallback(() => {
    if (isInvalidDateRange(checkInDate, checkOutDate)) {
      showAlert('error', { message: 'Date range is invalid' });
      return;
    }
    dispatch(accommodationListActions.setFilter(formValues));
    changeOpen();
    return;
  }, [isInvalidDateRange, dispatch, changeOpen, formValues]);

  const handleResetSearch = useCallback(() => {
    setLocation('');
    setcheckInDate('');
    setcheckOutDate('');
  }, [setLocation, setcheckOutDate, setcheckInDate]);

  const [stateToggle, dispatchToggle] = useReducer(searchSlice.reducer, searchSlice.getInitialState())

  const toggleLocationCollapse = useCallback(() => {
    dispatchToggle(searchSlice.actions.toggleLocationCollapse);
  }, [searchSlice, dispatchToggle])

  const toggleCheckinCollapse = useCallback(() => {
    dispatchToggle(searchSlice.actions.toggleCheckinCollapse);
  }, [searchSlice, dispatchToggle])

  const toggleCheckoutCollapse = useCallback(() => {
    dispatchToggle(searchSlice.actions.toggleCheckoutCollapse);
  }, [searchSlice, dispatchToggle])

  const sections = [
    { type: 'location', title: 'Destination' },
    { type: 'checkin', title: 'Check-in' },
    { type: 'checkout', title: 'Check-out' },
  ];

  return (
    <Modal
      animationType="fade"
      visible={modalOpen}
      onRequestClose={changeOpen}>
      <StatusBar backgroundColor={colors ? BLACK : WHITE_100} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors ? BLACK : WHITE_100,
          alignItems: 'center',
          maxHeight: '90%',
        }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={[
              styles.icon,
              LEVEL_1,
              { backgroundColor: colors ? BLACK : WHITE,
                borderColor: colors ? WHITE : BLACK,
                shadowColor: colors ? WHITE : BLACK, }]}
            onPress={() => changeOpen()}
          >
            <Icon name={IconName.Close} size={30} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20 }}>Accomodations</Text>
          <View style={{ width: 34 }} />
        </View>
        <FlatList
          data={sections}
          keyExtractor={(item) => item.type}
          renderItem={({ item }) => {
            if (item.type === 'location') {
              return (
                <CollapsableLocationItem
                title={item.title}
                location={location}
                stateToggleCollapsed={stateToggle.isCollapsed.location}
                toggleLocationCollapse={toggleLocationCollapse}
                handleAutocompleteSearch={handleGooglePlacesSearch}
                clearLocation={clearLocation}
                />
                )
            }
            if (item.type === 'checkin') {
              return (
                <CollapsableDatePicker
                  title={item.title}
                  date={checkInDate}
                  stateToggleCollapsed={stateToggle.isCollapsed.checkin}
                  toggleCollapse={toggleCheckinCollapse}
                  minimumDate={getCheckInMinDate()}
                  handleDateChange={handleCheckInChange}
                  clearDate={clearCheckin}
                />);
            }
            if (item.type === 'checkout') {
              return (
                <CollapsableDatePicker
                  title={item.title}
                  date={checkOutDate}
                  stateToggleCollapsed={stateToggle.isCollapsed.checkout}
                  toggleCollapse={toggleCheckoutCollapse}
                  minimumDate={getCheckOutMinDate()}
                  handleDateChange={handleCheckOutChange}
                  clearDate={clearCheckout}
                />)
            }
            return null;
          } } 
          />
    </SafeAreaView>
      <ThemedView
        style={[styles.searchModalFooter, LEVEL_1]}>
        <TouchableOpacity onPress={handleResetSearch}>
          <Text style={styles.title}>Reset</Text>
        </TouchableOpacity>
        <Button onPress={handleSearch} title="Search" size={BUTTON_SIZES.MD} />
      </ThemedView>
    </Modal>
  );
};

export default SearchModal;
