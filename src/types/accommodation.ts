export interface CreateAccommodationValues {
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
