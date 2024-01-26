import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';

import { styles } from './Notifications.style';

const Notifications = () => {
  const { t } = useTranslation();

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.noNotificationsText}>{t("You don't have any notifications!")}</Text>
      </View>
    </ScreenTemplate>
  );
};

export default Notifications;
