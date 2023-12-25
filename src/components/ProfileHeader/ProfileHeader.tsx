import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Image, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from 'src/navigation';
import { getColors, getIsGuestAccount, getUserDetails } from 'src/store/selectors';
import { IconName } from 'src/types/ui';

import styles from './ProfileHeader.style';
import { ButtonType } from '../Button';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

const ProfileHeader = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const colors = useSelector(getColors);
  const user = useSelector(getUserDetails);
  const isGuestUser = useSelector(getIsGuestAccount);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // console.log(user);

  const handlePressed = () => {
    if (isGuestUser) {
      navigation.navigate('CreateProfile');
    } else {
      navigation.navigate('Account');
    }
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn && (
        <View style={styles.header}>
          <View style={{ gap: 4 }}>
            <Text style={styles.title}>Your Profile</Text>
            <Text style={styles.subTitle}>
              Sign in to your account and start your journey with us today.
            </Text>
          </View>

          <View style={styles.redirectAuthContainer}>
            <Button
              title="Sign In"
              onPress={() => {
                navigation.navigate('Signin');
              }}
            />
            <View style={styles.redirectAuthContainer}>
              <Text>Don't have an account yet?</Text>
              <Button
                title="Sign Up"
                type={ButtonType.SECONDARY}
                onPress={() => {
                  navigation.navigate('Signup');
                }}
              />
            </View>
          </View>
        </View>
      )}

      {isLoggedIn && (
        <View style={styles.loggedInHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Profile</Text>
          </View>

          <TouchableOpacity
            style={[styles.accountHeader, { borderBottomColor: colors.border }]}
            onPress={handlePressed}
          >
            <View style={styles.accountHeaderContents}>
              <View style={[styles.imageContainer, { borderColor: colors.border }]}>
                {user?.profile?.imageUrl ? (
                  <Image
                    source={{
                      uri: user.profile.imageUrl,
                    }}
                    style={styles.image}
                  />
                ) : (
                  <Icon name={IconName.Person} size={60} />
                )}
              </View>

              <View>
                <Text style={styles.accountName}>
                  {user?.profile ? `${user.firstName} ${user.lastName}` : user?.email}
                </Text>
                <Text style={styles.description}>
                  {isGuestUser ? 'tap to create' : 'show profile'}
                </Text>
              </View>
            </View>

            <Icon name={IconName.ChevronForward} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;
