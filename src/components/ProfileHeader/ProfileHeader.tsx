import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Image, View } from 'react-native';
import { FONT_SIZES } from 'src/styles';
import { useTheme } from 'src/theme';
import { IconName } from 'src/types/ui';

import styles from './ProfileHeader.style';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import { user } from 'src/data';
import { RootStackParamList } from 'src/navigation';

interface Props {
  isLoggedIn: boolean;
}

const ProfileHeader = ({ isLoggedIn }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { colors } = useTheme();

  return (
    <View style={{ paddingVertical: 15 }}>
      {!isLoggedIn && (
        <View style={styles.header}>
          <View style={{ gap: 4 }}>
            <Text style={styles.title}>Your Profile</Text>
            <Text style={styles.subTitle}>
              Sign in to your account and start your journey with us today.
            </Text>
          </View>

          <View style={styles.redirectAuthWrapper}>
            <Button
              title="Signin"
              onPress={() => {
                console.log('redirect to signin!');
              }}
            />
            <View style={styles.redirectAuthTextWrapper}>
              <Text style={{ fontSize: FONT_SIZES.SM }}>Don't have an account yet?</Text>
              <Text style={{ textDecorationLine: 'underline' }}>signup</Text>
            </View>
          </View>
        </View>
      )}

      {isLoggedIn && (
        <View style={styles.loggedInHeader}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Profile</Text>
            <Icon name={IconName.Notifications} size={26} />
          </View>

          <TouchableOpacity
            style={[styles.accountHeader, { borderBottomColor: colors.border }]}
            onPress={() => navigation.navigate('CreateProfile')}
          >
            <View style={styles.accountHeaderContents}>
              <View style={[styles.imageContainer, { borderColor: colors.border }]}>
                {user?.photoUrl ? (
                  <Image
                    source={{
                      uri: user.photoUrl,
                    }}
                    style={styles.image}
                  />
                ) : (
                  <Icon name={IconName.Person} size={60} />
                )}
              </View>
              <View>
                <Text style={styles.fullname}>
                  {user.firstName} {user.lastName}
                </Text>
                <Text style={styles.description}>show profile</Text>
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
