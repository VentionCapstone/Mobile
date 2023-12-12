import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Image, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from 'src/navigation';
import { getAccountDetails, getColors } from 'src/store/selectors';
import { IconName } from 'src/types/ui';

import styles from './ProfileHeader.style';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

interface Props {
  isLoggedIn: boolean;
}

const ProfileHeader = ({ isLoggedIn }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const colors = useSelector(getColors);
  const user = useSelector(getAccountDetails);

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

          <View style={styles.redirectAuthContainer}>
            <Button
              title="Sign In"
              onPress={() => {
                console.log('redirect to signin!');
                navigation.navigate('Signin');
              }}
            />
            <View style={styles.redirectAuthContainer}>
              <Text>Don't have an account yet?</Text>
              <Button
                title="Sign Up"
                type="secondary"
                onPress={() => {
                  console.log('redirect to signup!');
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
                <Text style={styles.accountName}>Tester Testerov</Text>
                <Text style={styles.description}>tap to create</Text>
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
