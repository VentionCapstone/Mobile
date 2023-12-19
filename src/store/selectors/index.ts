import { RootState } from '..';

export const getAccountInfos = (state: RootState) => state.account.result;
export const getAccountLoader = (state: RootState) => state.account.pending;
export const getAccountError = (state: RootState) => state.account.error;
export const getIsGuestAccount = (state: RootState) => state.account.isGuest;
export const getIsLoggedIn = (state: RootState) => state.account.isLoggedIn;
export const getUserId = (state: RootState) => state.account.user_id;

export const getColors = (state: RootState) => state.theme.colors;
export const getIsDarkMode = (state: RootState) => state.theme.isDark;

export const getAccommodationError = (state: RootState) => state.accommodation.error;
export const getAccommodationLoader = (state: RootState) => state.accommodation.pending;
export const getMyAccommodations = (state: RootState) => state.accommodation.result;

export const getUserDetails = (state: RootState) => state.user.result;
