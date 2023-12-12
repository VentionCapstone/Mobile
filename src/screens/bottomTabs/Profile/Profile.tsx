import { useDispatch } from 'react-redux';
import { Button, NavigationList, ProfileHeader } from 'src/components';
import { ButtonType } from 'src/components/Button';
import { ScreenTemplate } from 'src/components/templates';
import { AsyncThunks } from 'src/store/thunks';
import { BUTTON_SIZES } from 'src/styles';

import { ACCOUNT_SECTIONS } from './Profile.constants';
import styles from './Profile.style';

const Profile = () => {
  const isLoggedIn = false;
  const dispatch = useDispatch();

  return (
    <ScreenTemplate headerShown={false} style={styles.container}>
      <ProfileHeader isLoggedIn={isLoggedIn} />

      <NavigationList sections={ACCOUNT_SECTIONS} />

      {isLoggedIn && (
        <Button
          width={100}
          marginVertical={30}
          title="Log out"
          size={BUTTON_SIZES.SM}
          type={ButtonType.SECONDARY}
          onPress={() => {
            dispatch(AsyncThunks.signOut());
            console.log('logout');
          }}
        />
      )}
    </ScreenTemplate>
  );
};

export default Profile;
