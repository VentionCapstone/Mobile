import { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonType, NavigationList, ProfileHeader, showAlert } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { AppDispatch } from 'src/store';
import { getAccountInfos, getIsLoggedIn, getUserDetails, getUserId } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { BUTTON_SIZES } from 'src/styles';

import { ACCOUNT_SECTIONS } from './Profile.constants';

const Profile = () => {
  const userId = useSelector(getUserId);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const accountDetails = useSelector(getAccountInfos);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogOut = () => {
    showAlert('error', {
      message: 'Failed to log out!',
    });
  };

  const getAccountDetails = async () => {
    const response = await dispatch(AsyncThunks.getUserDetails(userId));

    if (!response.payload.error) {
      const { id } = response.payload.data.Profile;
      await dispatch(AsyncThunks.getAccountDetails(id));
    }
  };

  useEffect(() => {
    if (accountDetails === null && isLoggedIn) {
      console.log('called');
      getAccountDetails();
    }
  }, [isLoggedIn]);

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
