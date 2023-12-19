const ENDPOINTS = {
  account: {
    create: '/users/profile',
    update: (userId: string) => `/users/profile/${userId}`,
    getProfile: (userId: string | null) => `/users/profile/${userId}`,
  },

  user: {
    getUser: (userId: string | null) => `/users/${userId}`,
  },

  accommodation: {
    create: '/accommodation/create',
    update: (accommodationId: string) => `/accommodation/update/${accommodationId}`,
    uploadImage: (accommodationId: string) => `/accommodation/file/${accommodationId}`,
    delete: (accommodationId: string) => `/accommodation/delete/${accommodationId}`,
    getAll: '/accommodations',
    getById: (accommodationId: string) => `/accommodation/get/${accommodationId}`,
    getMyAccommodations: `/accommodation/getAll`,
  },
  auth: {
    signin: '/auth/signin',
    signup: '/auth/signup',
    signout: '/auth/signout',
    refresh: (id: string) => `/auth/${id}/refresh`,
    verify: '/auth/verify',
  },
};

export default ENDPOINTS;
