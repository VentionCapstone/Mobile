import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { FlatList, Modal, SafeAreaView, TouchableOpacity, View } from 'react-native';
import DatePicker, { getToday } from 'react-native-modern-datepicker';
import { useSelector } from 'react-redux';
import Button from 'src/components/Button/Button';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import ThemedView from 'src/components/ThemedView/ThemedView';
import { getColors, getFilterSettings } from 'src/store/selectors';
import { BLACK, BUTTON_SIZES, GREY_200, LEVEL_1, TOMATO, WHITE, WHITE_100 } from 'src/styles';
import { IconName } from 'src/types';
import { styles } from './SearchModal.styles';
import { COLLAPSABLE_CARDS_POSITIONS, formatLocationString, getNextDay, getPlaceDetails, isInvalidDateRange } from './SearchModal.utils';
import { useAppDispatch } from 'src/store';
import { accommodationListActions } from 'src/store/slices';
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import showAlert from 'src/components/alert';
import Collapsable from 'src/components/Collapsable/Collapsable';

type ExploreModalProps = {
  modalOpen: boolean;
  changeOpen: () => void;
};

const SearchModal = ({ modalOpen, changeOpen }: ExploreModalProps) => {
  const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY ?? '';
  const colors = useSelector(getColors);
  const dispatch = useAppDispatch();
  const filter = useSelector(getFilterSettings);
  const [location, setLocation] = useState("")
  const [checkInDate, setcheckInDate] = useState("")
  const [checkOutDate, setcheckOutDate] = useState("")

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
  },[setcheckOutDate])

  const clearLocation = useCallback(() => {
    setLocation('');
  }, [setLocation]);

  const handleSearch = useCallback(() => {

    if (isInvalidDateRange(checkInDate, checkOutDate)) {
      showAlert('error', { message: 'Date range is invalid' });
      return;
    }
    dispatch(accommodationListActions.setFilter({...filter, location, checkInDate, checkOutDate}));
    changeOpen();
    return;
  }, [filter, isInvalidDateRange, dispatch, changeOpen]);

  const handleResetSearch = useCallback(() => {
    setLocation('');
    setcheckInDate('');
    setcheckOutDate('');
  }, [setLocation,setcheckOutDate, setcheckInDate]);

  const [isCollapsed, setIsCollapsed] = useState(COLLAPSABLE_CARDS_POSITIONS.allClosed);

  const toggleCollapseLocation = () => {
    isCollapsed.location ? 
      setIsCollapsed(COLLAPSABLE_CARDS_POSITIONS.locationPressed) :
      setIsCollapsed(COLLAPSABLE_CARDS_POSITIONS.allClosed);
  };

  const toggleCollapseCheckIn = () => {
    isCollapsed.checkin ? 
    setIsCollapsed(COLLAPSABLE_CARDS_POSITIONS.checkInPressed) :
    setIsCollapsed(COLLAPSABLE_CARDS_POSITIONS.allClosed);
  };

  const toggleCollapseCheckOut = () => {
    isCollapsed.checkout ? 
    setIsCollapsed(COLLAPSABLE_CARDS_POSITIONS.checkOutPressed) :
    setIsCollapsed(COLLAPSABLE_CARDS_POSITIONS.allClosed);
  };

  const sections = [
    { type: 'location', title: 'Destination' },
    { type: 'checkin', title: 'Check-in' },
    { type: 'checkout', title: 'Check-out' },
  ];

  return (
    <Modal
      animationType="fade"
      visible={modalOpen}
      onRequestClose={() => {
        changeOpen();
      } }
    >
      <StatusBar backgroundColor={colors ? BLACK : WHITE_100} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors ? BLACK : WHITE_100,
          alignItems: 'center',
          maxHeight: '90%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 40,
            marginBottom: 20,
            paddingHorizontal: 15,
          }}
        >
          <TouchableOpacity
            style={[
              styles.icon,
              LEVEL_1,
              {
                backgroundColor: colors ? BLACK : WHITE,
                borderColor: colors ? WHITE : BLACK,
                shadowColor: colors ? WHITE : BLACK,
              },
            ]}
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
                <Collapsable
                  title={item.title}
                  subtitle={location ? location : "Anywhere"}
                  contentTitle="Pick your next destination"
                  collapsed={isCollapsed.location}
                  onTouch={toggleCollapseLocation}>
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
                      onPress={handleGooglePlacesSearch}
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
            if (item.type === 'checkin') {
              return (
                <Collapsable
                  title={item.title}
                  subtitle={checkInDate ? checkInDate : "Anyday"}
                  contentTitle={item.title}
                  collapsed={isCollapsed.checkin}
                  onTouch={toggleCollapseCheckIn}
                >
                  <DatePicker
                    options={{
                      backgroundColor: colors ? BLACK : WHITE,
                      textHeaderColor: colors ? WHITE : BLACK,
                      textDefaultColor: colors ? WHITE : BLACK,
                      selectedTextColor: WHITE,
                      mainColor: TOMATO,
                      textSecondaryColor: GREY_200,
                      borderColor: colors ? BLACK : WHITE,
                    }}
                    mode="calendar"
                    minimumDate={getCheckInMinDate()}
                    onSelectedChange={handleCheckInChange}
                    current={getToday()}
                    selected={checkInDate ? checkInDate : undefined}
                  />
                  <TouchableOpacity onPress={clearCheckin}>
                    <Text style={styles.buttonText}>Clear</Text>
                  </TouchableOpacity>
                </Collapsable>);
            }
            if (item.type === 'checkout') {
              return (
                <Collapsable
                  title={item.title}
                  subtitle={checkOutDate ? checkOutDate : "Anyday"}
                  contentTitle={item.title}
                  collapsed={isCollapsed.checkout}
                  onTouch={toggleCollapseCheckOut}
                >
                  <DatePicker
                    options={{
                      backgroundColor: colors ? BLACK : WHITE,
                      textHeaderColor: colors ? WHITE : BLACK,
                      textDefaultColor: colors ? WHITE : BLACK,
                      selectedTextColor: WHITE,
                      mainColor: TOMATO,
                      textSecondaryColor: GREY_200,
                      borderColor: colors ? BLACK : WHITE,
                    }}
                    mode="calendar"
                    minimumDate={getCheckOutMinDate()}
                    onSelectedChange={handleCheckOutChange}
                    current={getToday()}
                    selected={checkOutDate ? checkOutDate : ''} />
                  <TouchableOpacity onPress={clearCheckout}>
                    <Text style={styles.buttonText}>Clear</Text>
                  </TouchableOpacity>
                </Collapsable>);
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
