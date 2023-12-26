export interface AmenitiesResponseData extends Amenities {
  id: string;
  accomodationId: string;
}

export interface AmenitiesParams {
  id: string;
  data: Amenities;
}

export interface Amenities {
  hasWifi?: boolean;
  hasParking?: boolean;
  hasSwimmingPool?: boolean;
  hasPetAllowance?: boolean;
  isQuetArea?: boolean;
  hasBackyard?: boolean;
  hasSmokingAllowance?: boolean;
  isChildFriendly?: boolean;
  hasHospitalNearby?: boolean;
  isCloseToCenter?: boolean;
  hasLaundryService?: boolean;
  hasKitchen?: boolean;
  hasAirConditioning?: boolean;
  hasTv?: boolean;
  hasAirportTransfer?: boolean;
  otherAmenities?: string;
}
