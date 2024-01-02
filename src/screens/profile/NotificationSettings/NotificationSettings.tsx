import { View } from 'react-native';
import { Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';

import { styles } from './NotificationSettings.style';

const NotificationSettings = () => {
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.noNotificationsText}>Notifications settings</Text>
      </View>
    </ScreenTemplate>
  );
};

export default NotificationSettings;
