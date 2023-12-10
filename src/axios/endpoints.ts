export const ENDPOINTS = {
  account: {
    create: '/users/profile',
    update: (userId: string) => `/users/profile/${userId}`,
  },

  accommodation: {
    create: '/accommodation/create',
    update: (accommodationId: string) => `/accommodation/update/${accommodationId}`,
    delete: (accommodationId: string) => `/accommodation/delete/${accommodationId}`,
    getAll: '/accommodations',
    getOne: (accommodationId: string) => `/accommodation/get/${accommodationId}`,
  },
};
