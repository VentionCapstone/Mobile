export interface CreateAccommodationValues {
  ownerId?: string;
  thumbnailUrl?: string;
  previewImgUrl?: string;
  squareMeters: number | null;
  numberOfRooms: number | null;
  price: number | null;
  availability: boolean;
  availableFrom: string;
  availableTo: string;
  description: string;
}

export interface AddressValues {
  street: string;
  city: string;
  country: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
}
