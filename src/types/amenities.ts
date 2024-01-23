export interface EditAmenitiesProps {
  accomodationId: string;
  isNew: boolean;
}

export type AmenityListResponse = {
  success: boolean;
  data: string[];
};

export interface Amenities {
  hasWifi: boolean;
  hasTv: boolean;
  hasAirConditioning: boolean;
  hasKitchen: boolean;
  hasLaundryService: boolean;
  hasParking: boolean;
  hasSmokingAllowance: boolean;
  hasSwimmingPool: boolean;
  hasBackyard: boolean;
  isQuetArea: boolean;
  isChildFriendly: boolean;
  hasPetAllowance: boolean;
  isCloseToCenter: boolean;
  hasHospitalNearby: boolean;
  hasAirportTransfer: boolean;
  otherAmenities: string | string[] | null;
}
export interface AccommodationAmenitiesResponse extends Amenities {
  id: string;
  accommodationId: string;
}

export type AmenitiesParams = {
  accommodationId: string;
};

export interface UpdateAmenitiesParams {
  accomodationId: string;
  data: Amenities;
}

export type EditAmenitiesResponse = AccommodationAmenitiesResponse & {
  message: string;
};
