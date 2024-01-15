import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, ScrollView, View, TextInput } from 'react-native';
import { Button, ButtonType, Chip, Icon, Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { AsyncThunks } from 'src/store/thunks';
import { BUTTON_SIZES } from 'src/styles';
import { ApiSuccessResponseType, IconName } from 'src/types';
import { AccommodationAmenitiesResponse, UpdateAmenitiesParams } from 'src/types/amenities';

import { styles } from './CreateAmenities.styles';
import { SelectedAmenities, amenitiesObj } from './CreateAmenities.utils';

type CreateAmenitiesNavigationProp = StackNavigationProp<RootStackParamList, 'CreateAmenities'>;
type CreateAmenitiesRouteProp = RouteProp<RootStackParamList, 'CreateAmenities'>;

export interface AmenitiesProps {
  navigation: CreateAmenitiesNavigationProp;
  route: CreateAmenitiesRouteProp;
}

const CreateAmenities = ({ route }: AmenitiesProps) => {
  const { isNew, accomodationId } = route.params as { isNew: boolean; accomodationId: string };
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedAmenities, setSelectedAmenities] = useState<SelectedAmenities>({
    Wifi: false,
    hasTv: false,
    hasAirConditioning: false,
    hasKitchen: false,
    hasLaundryService: false,
    hasParking: false,
    hasSmokingAllowance: false,
    hasSwimmingPool: false,
    hasBackyard: false,
    isQuetArea: false,
    isChildFriendly: false,
    hasPetAllowance: false,
    isCloseToCenter: false,
    hasHospitalNearby: false,
    hasAirportTransfer: false,
  });
  const [otherAmenities, setOtherAmenities] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const amenities: string[] = Object.keys(selectedAmenities);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  const toggleAmenity = (amenityKey: string) => {
    setSelectedAmenities((prevSelectedAmenities: SelectedAmenities) => ({
      ...prevSelectedAmenities,
      [amenityKey]: !prevSelectedAmenities[amenityKey],
    }));
  };

  const addOtherAmenities = () => {
    if (inputValue.trim() !== '') {
      setOtherAmenities((prevAmenity) => [...prevAmenity, inputValue]);
      scrollToBottom();
      setInputValue('');
    }
  };

  const renderAdditionalChips = () => {
    return otherAmenities.map((item, index) => (
      <Chip
        key={index}
        iconName={IconName.Check}
        iconSet="ionicons"
        text={item}
        onTouchFunction={() => removeAdditionalChip(index)}
        state
      />
    ));
  };

  const removeAdditionalChip = (index: number) => {
    const updatedOptions = [...otherAmenities];
    updatedOptions.splice(index, 1);
    setOtherAmenities(updatedOptions);
  };

  const onFormSubmit = async () => {
    try {
      const response = await dispatch(
        AsyncThunks.addAmenitiesThunk({
          accomodationId,
          data: {
            ...selectedAmenities,
            otherAmenities: otherAmenities.join(' ,'),
          },
        } as UpdateAmenitiesParams)
      );
      if (response.meta.requestStatus === 'fulfilled') {
        console.log('Amenities added successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSavedAmenities = async () => {
    const response = await dispatch(AsyncThunks.getAmenitiesThunk({ accomodationId }));
    if (response.payload?.success) {
      const { data } = response.payload as ApiSuccessResponseType<AccommodationAmenitiesResponse>;
      setSelectedAmenities((({ otherAmenities, id, accomodationId, ...rest }) => rest)(data));
      setOtherAmenities(data.otherAmenities.split(' ,'));
    } else {
      throw new Error('Error while fetching amenities');
    }
  };

  useEffect(() => {
    if (!isNew) {
      getSavedAmenities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScreenTemplate>
        <ScrollView ref={scrollViewRef} style={styles.container}>
          <Text style={styles.title}>Tell your guests what your place has to offer</Text>
          <Text style={styles.subtitle}>
            You can add more amenities after you publish your listing
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {amenities.map((amenity) => {
              return (
                <Chip
                  key={amenity}
                  iconName={amenitiesObj[amenity].icon}
                  iconSet={amenitiesObj[amenity].iconSet}
                  text={amenitiesObj[amenity].text}
                  onTouchFunction={() => toggleAmenity(amenity)}
                  state={selectedAmenities[amenity]}
                />
              );
            })}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Text style={styles.title}>Add other amenities</Text>
            <Text style={styles.subtitle}>
              You can put here anything that can make you stand out even more
            </Text>
            {renderAdditionalChips()}
          </View>
          <View style={styles.inputField}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Icon name={IconName.Albums} size={24} iconSet="ionicons" />
              <TextInput
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
                style={styles.inputText}
                placeholder="Other amenities"
              />
            </View>
            <TouchableOpacity onPress={() => addOtherAmenities()}>
              <Icon name={IconName.AddBlank} size={28} iconSet="ionicons" />
            </TouchableOpacity>
          </View>
          <View style={styles.emptySpace} />
        </ScrollView>
        <View style={styles.footer}>
          <Button
            title="Back"
            height={35}
            size={BUTTON_SIZES.SM}
            type={ButtonType.SECONDARY}
            onPress={() => {
              onFormSubmit();
              console.log('submitted');
            }}
          />
          <Button
            title="Next"
            height={35}
            size={BUTTON_SIZES.SM}
            type={ButtonType.PRIMARY}
            onPress={() => {
              console.log("it's gone");
              navigation.goBack();
            }}
          />
        </View>
      </ScreenTemplate>
    </View>
  );
};

export default CreateAmenities;
