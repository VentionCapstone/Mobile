import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { getColors, getIsGuestAccount, getUserDetails } from 'src/store/selectors';

import { styles } from './Account.style';

const Account = () => {
  const colors = useSelector(getColors);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isGuestUser = useSelector(getIsGuestAccount);
  const user = useSelector(getUserDetails);

  return (
    <ScreenTemplate>
      {isGuestUser && (
        <View style={styles.redirectContainer}>
          <Text style={styles.redirectToCreateText}>You didn't create your account yet</Text>

          <Button
            width="100%"
            title="Create Account"
            onPress={() => navigation.navigate('CreateProfile')}
          />
        </View>
      )}

      {!isGuestUser && (
        <View style={styles.container}>
          <View style={[styles.card, { borderBottomColor: colors.border }]}>
            <Text style={styles.label}>Firstname</Text>
            <Text style={styles.value}>{user?.firstName}</Text>
          </View>
          <View style={[styles.card, { borderBottomColor: colors.border }]}>
            <Text style={styles.label}>Lastname</Text>
            <Text style={styles.value}>{user?.lastName}</Text>
          </View>
          <View style={[styles.card, { borderBottomColor: colors.border }]}>
            <Text style={styles.label}>Phone number</Text>
            <Text style={styles.value}>{user?.profile?.phoneNumber}</Text>
          </View>
          <View style={[styles.card, { borderBottomColor: colors.border }]}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email}</Text>
          </View>
          <View style={[styles.card, { borderBottomColor: colors.border }]}>
            <Text style={styles.label}>Country</Text>
            <Text style={styles.value}>{user?.profile?.country}</Text>
          </View>

          <Button
            title="Edit"
            marginVertical={30}
            onPress={() => navigation.navigate('UpdateProfile')}
          />
        </View>
      )}
    </ScreenTemplate>
  );
};

export default Account;
