export interface CreateAccommodationValues {
  title: string;
  thumbnailUrl?: string;
  previewImgUrl?: string;
  squareMeters: number | null;
  numberOfRooms: number | null;
  allowedNumberOfPeople: number | null;
  price: number | null;
  availableFrom: string;
  availableTo: string;
  timezoneOffset: number;
  description: string;
  address: AddressValues;
}

export interface UpdateAccommodationValues extends CreateAccommodationValues {}

export interface AddressValues {
  street: string;
  city: string;
  country: string;
  zipCode: string;
  latitude: number | null;
  longitude: number | null;
}
