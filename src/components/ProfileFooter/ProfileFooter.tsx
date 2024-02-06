import { View } from 'react-native';

import { styles } from './ProfileFooter.style';
import Text from '../Text/Text';

const ProfileFooter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.servicesTextContainer}>
        <Text style={styles.servicesText}>Help & Support</Text>
        <Text style={styles.servicesText}>Terms of Service</Text>
        <Text style={styles.servicesText}>Privacy Police</Text>
      </View>
      <Text style={styles.signature}>© 2024 StayHop, Inc. All Rights Reserved.</Text>
    </View>
  );
};

export default ProfileFooter;
