import { ListingSearchValues } from 'src/types';

export const getAccommodationsListQuery = (queryParams: ListingSearchValues): string => {
  const endpoint = Object.keys(queryParams)
    .map((header) => {
      if (queryParams[header as keyof ListingSearchValues]) {
        return `${header}=${encodeURIComponent(
          queryParams[header as keyof ListingSearchValues] as string | number | boolean
        )}`;
      }
      return '';
    })
    .filter(Boolean)
    .join('&');
  return '?' + endpoint;
};
