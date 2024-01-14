import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/navigation';
import { IconName, IconSet } from 'src/types';

interface AmenitiesComponentData {
  [key: string]: {
    name: string;
    text: string;
    icon: IconName;
    iconSet: IconSet;
  };
}

type CreateAmenitiesNavigationProp = StackNavigationProp<RootStackParamList, 'CreateAmenities'>;
type CreateAmenitiesRouteProp = RouteProp<RootStackParamList, 'CreateAmenities'>;

export interface AmenitiesProps {
  navigation: CreateAmenitiesNavigationProp;
  route: CreateAmenitiesRouteProp;
}

export const amenitiesObj: AmenitiesComponentData = {
  Wifi: {
    name: 'Wifi',
    text: 'Has Wi-Fi',
    icon: IconName.Wifi,
    iconSet: 'ionicons',
  },
  hasTv: {
    name: 'hasTv',
    text: 'Has TV',
    icon: IconName.Tv,
    iconSet: 'ionicons',
  },
  hasAirConditioning: {
    name: 'hasAirConditioning',
    text: 'Has air conditioning',
    icon: IconName.Snow,
    iconSet: 'ionicons',
  },
  hasKitchen: {
    name: 'hasKitchen',
    text: 'Has kitchen',
    icon: IconName.Kitchen,
    iconSet: 'material',
  },
  hasLaundryService: {
    name: 'hasLaundryService',
    text: 'Has laundry service',
    icon: IconName.Shirt,
    iconSet: 'ionicons',
  },
  hasParking: {
    name: 'hasParking',
    text: 'Has parking',
    icon: IconName.Parking,
    iconSet: 'ionicons',
  },
  hasSmokingAllowance: {
    name: 'hasSmokingAllowance',
    text: 'Has smoking allowance',
    icon: IconName.Smoking,
    iconSet: 'material',
  },
  hasSwimmingPool: {
    name: 'hasSwimmingPool',
    text: 'Has swimming pool',
    icon: IconName.Pool,
    iconSet: 'material',
  },
  hasBackyard: {
    name: 'hasBackyard',
    text: 'Has backyard',
    icon: IconName.Home,
    iconSet: 'ionicons',
  },
  isQuetArea: {
    name: 'isQuetArea',
    text: 'Is quet area',
    icon: IconName.Moon,
    iconSet: 'ionicons',
  },
  isChildFriendly: {
    name: 'isChildFriendly',
    text: 'Is child friendly',
    icon: IconName.Child,
    iconSet: 'material',
  },
  hasPetAllowance: {
    name: 'hasPetAllowance',
    text: 'Has pet allowance',
    icon: IconName.Paw,
    iconSet: 'ionicons',
  },
  isCloseToCenter: {
    name: 'isCloseToCenter',
    text: 'Is close to center',
    icon: IconName.Pin,
    iconSet: 'ionicons',
  },
  hasHospitalNearby: {
    name: 'hasHospitalNearby',
    text: 'Has hospital nearby',
    icon: IconName.Med,
    iconSet: 'ionicons',
  },
  hasAirportTransfer: {
    name: 'hasAirportTransfer',
    text: 'Has airport transfer',
    icon: IconName.Airplane,
    iconSet: 'ionicons',
  },
};
