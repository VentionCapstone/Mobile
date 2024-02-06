import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { getColors, getIsGuestAccount, getUserDetails } from 'src/store/selectors';

import { styles } from './Account.style';

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

const Account = ({ navigation }: Props) => {
  const colors = useSelector(getColors);
  const isGuestUser = useSelector(getIsGuestAccount);
  const user = useSelector(getUserDetails);
  const { t } = useTranslation();

  return (
    <ScreenTemplate>
      {isGuestUser && (
        <View style={styles.redirectContainer}>
          <Text style={styles.redirectToCreateText}>{t("You didn't create your account yet")}</Text>

          <Button
            width="100%"
            title={t('Create Account')}
            onPress={() => navigation.navigate('CreateProfile')}
          />
        </View>
      )}

      {!isGuestUser && (
        <View style={styles.container}>
          <View style={[styles.card, { borderBottomColor: colors.border }]}>
            <Text style={styles.label}>{t('Firstname')}</Text>
            <Text style={styles.value}>{user?.firstName}</Text>
          </View>
          <View style={[styles.card, { borderBottomColor: colors.border }]}>
            <Text style={styles.label}>{t('Lastname')}</Text>
            <Text style={styles.value}>{user?.lastName}</Text>
          </View>
          <View style={[styles.card, { borderBottomColor: colors.border }]}>
            <Text style={styles.label}>{t('Phone number')}</Text>
            <Text style={styles.value}>{user?.profile?.phoneNumber}</Text>
          </View>
          <View style={[styles.card, { borderBottomColor: colors.border }]}>
            <Text style={styles.label}>{t('Email')}</Text>
            <Text style={styles.value}>{user?.email}</Text>
          </View>
          <View style={[styles.card, { borderBottomColor: colors.border }]}>
            <Text style={styles.label}>{t('Country')}</Text>
            <Text style={styles.value}>{user?.profile?.country}</Text>
          </View>

          <Button
            title={t('Edit')}
            marginVertical={30}
            onPress={() => navigation.navigate('UpdateProfile')}
          />
        </View>
      )}
    </ScreenTemplate>
  );
};

export default Account;
