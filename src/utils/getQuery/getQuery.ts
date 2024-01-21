import { SearchValues } from 'src/types';

export const getAccommodationsListQuery = (queryParams: SearchValues): string => {
  const params = new URLSearchParams();

  Object.keys(queryParams).forEach((header) => {
    if (queryParams[header as keyof SearchValues]) {
      params.append(
        header,
        encodeURIComponent(queryParams[header as keyof SearchValues] as string | number | boolean)
      );
    }
  });

  return '?' + params.toString();
};
