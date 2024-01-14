import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Button,
  ButtonType,
  NavigationList,
  ProfileHeader,
  showAlert,
} from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { AppDispatch } from 'src/store';
import {
  getAccountError,
  getAccountInfos,
  getIsGuestAccount,
  getIsLoggedIn,
  getUserId,
} from 'src/store/selectors';
import {
  accommodationActions,
  accountActions,
  myAccommodationsListActions,
  userActions,
} from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { BUTTON_SIZES } from 'src/styles';
import { ApiSuccessResponseType, User } from 'src/types';

import { ACCOUNT_SECTIONS } from './Profile.constants';

const Profile = () => {
  const userId = useSelector(getUserId);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isGuestUser = useSelector(getIsGuestAccount);
  const accountDetails = useSelector(getAccountInfos);
  const userError = useSelector(getAccountError);
  const dispatch = useDispatch<AppDispatch>();

  const [errorVisible, setErrorVisible] = useState<boolean>(false);

  const handleLogOut = async () => {
    showAlert('warning', {
      message: 'Are you sure you want to log out?',
      onOkPressed: async () => {
        const response = await dispatch(AsyncThunks.signOut());

        if (response?.meta.requestStatus === 'fulfilled') {
          dispatch(accountActions.reset());
          dispatch(accommodationActions.reset());
          dispatch(myAccommodationsListActions.reset());
          dispatch(userActions.reset());
        }
      },
      onCancelPressed: () => {},
    });
  };

  const getAccountDetails = async () => {
    if (!userId) return;
    const user = await dispatch(AsyncThunks.getUserDetails(userId));
    const userProfile = (user.payload as ApiSuccessResponseType<User>).data.profile;

    if (userProfile) {
      const profileId = userProfile.id;
      await dispatch(AsyncThunks.getAccountDetails(profileId));
    }
  };

  useEffect(() => {
    if (!accountDetails && isLoggedIn) {
      getAccountDetails();
    }
  }, [isLoggedIn, isGuestUser]);

  useEffect(() => {
    if (userError) {
      setErrorVisible(true);
    }
  }, [userError]);

  useEffect(() => {
    dispatch(accountActions.clearError());
  }, []);

  return (
    <ScreenTemplate headerShown={false}>
      <ProfileHeader isLoggedIn={isLoggedIn} />

      <NavigationList sections={ACCOUNT_SECTIONS} />
      <View style={{ paddingHorizontal: 10 }}>
        {isLoggedIn && (
          <Button
            width={100}
            marginVertical={30}
            title="Log out"
            size={BUTTON_SIZES.SM}
            type={ButtonType.SECONDARY}
            onPress={handleLogOut}
          />
        )}
      </View>

      <Alert
        visible={errorVisible}
        message={userError?.error.message}
        onClose={() => setErrorVisible(false)}
      />
    </ScreenTemplate>
  );
};

export default Profile;
