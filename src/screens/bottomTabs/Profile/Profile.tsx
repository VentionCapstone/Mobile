import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonType, NavigationList, ProfileHeader, showAlert } from 'src/components';
import { Alert } from 'src/components/modals';
import { ScreenTemplate } from 'src/components/templates';
import { AppDispatch } from 'src/store';
import {
  getAccountError,
  getAccountInfos,
  getIsGuestAccount,
  getIsLoggedIn,
  getUserId,
} from 'src/store/selectors';
import { accommodationActions, accountActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { BUTTON_SIZES } from 'src/styles';

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
        dispatch(accommodationActions.reset());
        dispatch(accountActions.reset());
        const response = await dispatch(AsyncThunks.signOut());

        if (response?.payload.success) {
          dispatch(accommodationActions.reset());
          dispatch(accountActions.reset());
        }
      },
      onCancelPressed: () => {},
    });
  };

  const getAccountDetails = async () => {
    if (!userId) return;

    await dispatch(AsyncThunks.getAccountDetails(userId));
  };

  useEffect(() => {
    if (!accountDetails && isLoggedIn) {
      getAccountDetails();
    }
  }, [isLoggedIn, isGuestUser, userId]);

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
