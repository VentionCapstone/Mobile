export type WishlistAddress = {
  street: string;
  country: string;
  city: string;
};

export interface WishlistAccommodationResponse {
  id: string;
  squareMeters: number;
  numberOfRooms: number;
  allowedNumberOfPeople: number;
  price: number;
  address: WishlistAddress;
  thumbnailUrl: string;
}
