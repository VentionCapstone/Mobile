import { useRef, useState } from 'react';
import { TouchableOpacity, ScrollView, View, TextInput } from 'react-native';
import { Button, ButtonType, Chip, Icon, NavigationHeader } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { useAppDispatch } from 'src/store';
import { AsyncThunks } from 'src/store/thunks';
import { BUTTON_SIZES } from 'src/styles';
import { IconName } from 'src/types';

import { styles } from './CreateAmenities.styles';
import {
  AmenitiesProps,
  OtherAmenities,
  SelectedAmenities,
  amenitiesObj,
} from './CreateAmenities.utils';

const CreateAmenities = ({ id, isNew }: AmenitiesProps) => {
  const dispatch = useAppDispatch();
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
  const [otherAmenities, setOtherAmenities] = useState<OtherAmenities>({
    other: [],
  });
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
      setOtherAmenities((prevAmenity) => ({ other: [...prevAmenity.other, inputValue] }));
      setInputValue('');
      scrollToBottom();
    }
  };

  const renderAdditionalChips = () => {
    return otherAmenities.other.map((item, index) => (
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
    const updatedOptions = [...otherAmenities.other];
    updatedOptions.splice(index, 1);
    setOtherAmenities((prevAmenities) => ({ ...prevAmenities, other: updatedOptions }));
  };

  const onFormSubmit = async () => {
    try {
      const response = await dispatch(
        AsyncThunks.addAmenitiesThunk(id, { ...selectedAmenities, ...otherAmenities })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        console.log('Amenities added successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationHeader
        title="Add Amenities"
        rightComponent={
          <Button
            title="Submit"
            height={35}
            size={BUTTON_SIZES.SM}
            type={ButtonType.PRIMARY}
            onPress={() => {
              console.log('submitted');
            }}
          />
        }
      />
      <ScreenTemplate>
        <ScrollView ref={scrollViewRef} style={styles.container}>
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
          {renderAdditionalChips()}
          <View style={styles.emptySpace} />
        </ScrollView>
        <View style={styles.footer}>
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
        </View>
      </ScreenTemplate>
    </View>
  );
};

export default CreateAmenities;
