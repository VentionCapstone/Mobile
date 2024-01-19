const ENDPOINTS = {
  signin: '/auth/signin',
  signup: '/auth/signup',
  signout: '/auth/signout',
  refresh: (id: string) => `/auth/${id}/refresh`,
  verify: '/auth/email',

  createProfile: '/users/profile',
  updateProfile: (userId: string | undefined) => `/users/profile/${userId}`,
  getProfile: (userId: string) => `/users/profile/${userId}`,

  getUserDetails: (userId: string) => `/users/${userId}`,

  createAccomodation: '/accommodations',
  updateAccomodation: (accommodationId: string) => `/accommodations/${accommodationId}`,
  getMyAccommodations: `/accommodations/getAll`,
  uploadAccomodationImage: (accommodationId: string) => `/accommodations/${accommodationId}/file`,
  deleteAccomodation: (accommodationId: string) => `/accommodations/${accommodationId}`,
  getAllAccomodations: (query: string) => `/accomodations${query}`,
  getAccomodationById: (accommodationId: string) => `/accommodations/${accommodationId}`,

  getAmenitiesList: '/amenities',
  accomodationAmenities: (accommodationId: string) => `/amenities/${accommodationId}`,
};

export default ENDPOINTS;
