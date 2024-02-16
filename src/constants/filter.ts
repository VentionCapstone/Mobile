import { GetAccommodationQueryParams } from 'src/types';

const DEFAULT_FILTER_VALUES: GetAccommodationQueryParams = {
  orderByPrice: null,
  orderByRoom: null,
  orderByPeople: null,
  minPrice: null,
  maxPrice: null,
  minRooms: null,
  maxRooms: null,
  minPeople: null,
  maxPeople: null,
  checkInDate: null,
  checkOutDate: null,
  location: '',
};

const DEFAULT_SEARCH_VALUES: GetAccommodationQueryParams = {
  checkInDate: null,
  checkOutDate: null,
  location: '',
};

export { DEFAULT_FILTER_VALUES, DEFAULT_SEARCH_VALUES };
