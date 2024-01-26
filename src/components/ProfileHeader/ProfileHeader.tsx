import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, Image, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from 'src/navigation';
import { getColors, getIsGuestAccount, getUserDetails } from 'src/store/selectors';
import { IconName } from 'src/types/ui';

import styles from './ProfileHeader.style';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

const ProfileHeader = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const colors = useSelector(getColors);
  const user = useSelector(getUserDetails);
  const isGuestAccount = useSelector(getIsGuestAccount);
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const navigateToCreateOrUpdate = () => {
    if (isGuestAccount) {
      navigation.navigate('CreateProfile');
    } else {
      navigation.navigate('UpdateProfile');
    }
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn && (
        <View style={styles.header}>
          <View style={{ gap: 4 }}>
            <Text style={[styles.title, { color: colors.text }]}>{t('Your Profile')}</Text>
            <Text style={styles.subTitle}>
              {t('Sign in to your account and start your journey with us today.')}
            </Text>
          </View>

          <View style={styles.redirectAuthContainer}>
            <Button
              title={t('Sign In')}
              onPress={() => {
                navigation.navigate('Signin');
              }}
            />
            <View style={styles.redirectAuthContainer}>
              <Text>
                {t("Don't have an account yet?")}{' '}
                <Text
                  style={styles.underline}
                  onPress={() => {
                    navigation.navigate('Signup');
                  }}
                >
                  {t('Sign up')}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      )}

      {isLoggedIn && (
        <View style={styles.loggedInHeader}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>{t('Profile')}</Text>

            <TouchableOpacity
              style={styles.notificationIcon}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Icon name={IconName.Notifications} size={26} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.accountHeader, { borderBottomColor: colors.secondaryBackground }]}
            onPress={navigateToCreateOrUpdate}
          >
            <View style={styles.accountHeaderContents}>
              <View style={[styles.imageContainer, { borderColor: colors.border }]}>
                {user?.profile?.imageUrl && (
                  <Image
                    source={{
                      uri: user.profile.imageUrl,
                    }}
                    style={styles.image}
                  />
                )}

                {!user?.profile?.imageUrl && <Icon name={IconName.Person} size={60} />}
              </View>

              <View>
                <Text style={styles.accountName}>
                  {user?.profile ? `${user.firstName} ${user.lastName}` : user?.email}
                </Text>
                <Text style={styles.description}>
                  {isGuestAccount ? t('tap to create') : t('edit profile')}
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
