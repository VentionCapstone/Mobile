import { View } from 'react-native';
import { Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';

import { styles } from './Notifications.style';

const Notifications = () => {
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.noNotificationsText}>You don't have any notifications</Text>
      </View>
    </ScreenTemplate>
  );
};

export default Notifications;
