export interface EditAmenitiesProps {
  accomodationId: string;
  isNew: boolean;
}
export interface AmenitySetting {
  id: string;
  name: string;
  icon: string;
  added?: boolean;
}

export type AmenityListResponse = {
  success: boolean;
  data: string[];
};

export type Amenities = {
  [key: string]: boolean | string;
};

export type AccommodationAmenitiesResponse = {
  data: Amenities;
};

export type EditAmenitiesResponse = AccommodationAmenitiesResponse & {
  message: string;
};
