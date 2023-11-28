import { Button, NavigationList, ProfileHeader } from 'src/components';
import { ButtonType } from 'src/components/Button';
import { ScreenTemplate } from 'src/components/templates';
import { SIZES } from 'src/styles/containers';

import { ACCOUNT_SECTIONS } from './Profile.constants';
import styles from './Profile.style';

const Profile = () => {
  const isLoggedIn = true;

  return (
    <ScreenTemplate headerShown={false} style={styles.container}>
      <ProfileHeader isLoggedIn={isLoggedIn} />

      <NavigationList sections={ACCOUNT_SECTIONS} />

      {isLoggedIn && (
        <Button
          width={100}
          marginVertical={30}
          title="Log out"
          size={SIZES.SM}
          type={ButtonType.SECONDARY}
          onPress={() => console.log('logout')}
        />
      )}
    </ScreenTemplate>
  );
};

export default Profile;
