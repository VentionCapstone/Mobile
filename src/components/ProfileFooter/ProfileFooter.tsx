import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { styles } from './ProfileFooter.style';
import Text from '../Text/Text';

const ProfileFooter = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.servicesTextContainer}>
        <Text style={styles.servicesText}>{t('Help & Support')}</Text>
        <Text style={styles.servicesText}>{t('Terms of Service')}</Text>
        <Text style={styles.servicesText}>{t('Privacy Policy')}</Text>
      </View>
      <Text style={styles.signature}>{t('© 2024 Airbnb, Inc. All Rights Reserved.')}</Text>
    </View>
  );
};

export default ProfileFooter;
