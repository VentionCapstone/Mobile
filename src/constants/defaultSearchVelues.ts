import { SearchValues } from 'src/types';

export const DEFAULT_SEARCH_VALUES: SearchValues = {
  location: undefined,
  checkInDate: undefined,
  checkOutDate: undefined,
  orderByPrice: null,
  orderByRooms: null,
  orderByPeople: null,
  minPrice: 0,
  maxPrice: 0,
  minRooms: 0,
  maxRooms: 0,
  minPeople: 0,
  maxPeople: 0,
} as const;

export const DEFAULT_FILTER_VALUES: SearchValues = {
  orderByPrice: null,
  orderByRooms: null,
  orderByPeople: null,
  minPrice: 0,
  maxPrice: 0,
  minRooms: 0,
  maxRooms: 0,
  minPeople: 0,
  maxPeople: 0,
} as const;
