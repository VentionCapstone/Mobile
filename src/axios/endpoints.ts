const ENDPOINTS = {
  signin: '/auth/signin',
  signup: '/auth/signup',
  signout: '/auth/signout',
  refresh: (id: string) => `/auth/${id}/refresh`,
  verify: '/auth/verify',

  createProfile: '/users/profile',
  updateProfile: (userId: string) => `/users/profile/${userId}`,
  getProfile: (userId: string | null) => `/users/profile/${userId}`,

  getUserDetails: (userId: string | null) => `/users/${userId}`,

  createAccomodation: '/accommodation/create',
  updateAccomodation: (accommodationId: string) => `/accommodation/update/${accommodationId}`,
  getMyAccommodations: `/accommodation/getAll`,
  uploadAccomodationImage: (accommodationId: string) => `/accommodation/file/${accommodationId}`,
  deleteAccomodation: (accommodationId: string) => `/accommodation/delete/${accommodationId}`,
  getAllAccomodations: '/accommodations',
  getAccomodationById: (accommodationId: string) => `/accommodation/get/${accommodationId}`,
};

export default ENDPOINTS;
