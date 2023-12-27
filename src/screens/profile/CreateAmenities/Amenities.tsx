import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Icon, Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';

const amenitiesValues = [
  { name: 'Wi-Fi', value: 'hasWifi', iconName: 'Wifi' },
  { name: 'Parking', value: 'hasParking', iconName: 'Car' },
  { name: 'Swimming Pool', value: 'hasSwimmingPool', iconName: 'Pool' },
  { name: 'Pet Allowance', value: 'hasPetAllowance', iconName: 'paw' },
  { name: 'Quite Area', value: 'isQuiteArea', iconName: 'moon' },
  { name: 'Backyard', value: 'hasBackyard', iconName: 'leaf' },
  { name: 'Smoking Allowance', value: 'hasSmokingAllowance', iconName: 'smoking' },
  { name: 'Child Friendly', value: 'isChildFriendly', iconName: 'Child' },
  { name: 'Hospital Nearby', value: 'hasHospitalNearby', iconName: 'Med' },
  { name: 'Close to Center', value: 'isCloseToCenter', iconName: 'Pin' },
  { name: 'Laundry Service', value: 'hasLaundryService', iconName: 'Shirt' },
  { name: 'Kitchen', value: 'hasKitchen', iconName: 'Kitchen' },
  { name: 'Air Conditioning', value: 'hasAirConditioning', iconName: 'Snow' },
  { name: 'TV', value: 'hasTv', iconName: 'Tv' },
  { name: 'Airport Transfer', value: 'hasAirportTransfer', iconName: 'Plane' },
];

function getAmenitiesElements() {
  return amenitiesValues.map((amenity) => {
    return (
      <View>
        <Icon name="check" />
        <Text>{amenity.name}</Text>
      </View>
    );
  });
}

export default function Amenities({ route }) {
  const [formValues, setFormValues] = useState({
    hasWifi: false,
    hasParking: false,
    hasSwimmingPool: false,
    hasPetAllowance: false,
    isQuiteArea: false,
    hasBackyard: false,
    hasSmokingAllowance: false,
    isChildFriendly: false,
    hasHospitalNearby: false,
    isCloseToCenter: false,
    hasLaundryService: false,
    hasKitchen: false,
    hasAirConditioning: false,
    hasTv: false,
    hasAirportTransfer: false,
    otherAmenities: '',
  });

  useEffect(() => {}, []);

  return (
    <ScreenTemplate>
      <View>
        <Text>Amenities</Text>
      </View>
    </ScreenTemplate>
  );
}
