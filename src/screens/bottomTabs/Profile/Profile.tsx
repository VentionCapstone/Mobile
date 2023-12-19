import { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonType, NavigationList, ProfileHeader, showAlert } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { AppDispatch } from 'src/store';
import { getAccountInfos, getIsGuestAccount, getIsLoggedIn, getUserId } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { BUTTON_SIZES } from 'src/styles';

import { ACCOUNT_SECTIONS } from './Profile.constants';
import { accommodationActions, accountActions } from 'src/store/slices';

const Profile = () => {
  const userId = useSelector(getUserId);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isGuestUser = useSelector(getIsGuestAccount);
  const accountDetails = useSelector(getAccountInfos);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogOut = async () => {
    showAlert('warning', {
      message: 'Are you sure you want to log out?',
      onOkPressed: async () => {
        const response = await dispatch(AsyncThunks.signOut());

        if (!response.payload.error) {
          dispatch(accommodationActions.reset());
          dispatch(accountActions.reset());
        } else {
          showAlert('error', {
            message: 'Failed to log out!',
          });
        }
      },
      onCancelPressed: () => {},
    });
  };

  const getAccountDetails = async () => {
    const response = await dispatch(AsyncThunks.getUserDetails(userId));

    if (!response.payload.error) {
      const user = response.payload.data;

      if (user.Profile) {
        const { id } = user.Profile;
        await dispatch(AsyncThunks.getAccountDetails(id));
      }
    }
  };

  useEffect(() => {
    if (accountDetails === null && isLoggedIn) {
      getAccountDetails();
    }
  }, [isLoggedIn, isGuestUser]);

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
    </ScreenTemplate>
  );
};

export default Profile;
