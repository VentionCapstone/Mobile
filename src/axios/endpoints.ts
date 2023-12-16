export const ENDPOINTS = {
  account: {
    create: '/users/profile',
    update: '/users/profile',
  },
  auth: {
    signin: '/auth/signin',
    signup: '/auth/signup',
    signout: '/auth/signout',
    refresh: (id: string) => `/auth/${id}/refresh`,
    verify: '/auth/verify',
  },
};
