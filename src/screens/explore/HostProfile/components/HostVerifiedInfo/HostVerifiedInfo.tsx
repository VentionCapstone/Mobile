import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Text } from 'src/components';
import { PRIMARY_BLUE_200, PRIMARY_BLUE_300 } from 'src/styles';
import { HostProfile } from 'src/types';

import styles from './HostVerifiedInfo.styles';

interface Props {
  host: HostProfile;
}

const HostVerifiedInfo = ({ host }: Props) => {
  const { firstName, isVerified, isEmailVerified } = host;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${firstName}'s confirmed information`}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <MaterialIcons
            name={isVerified ? 'check' : 'close'}
            size={24}
            color={isVerified ? PRIMARY_BLUE_300 : PRIMARY_BLUE_200}
          />
          <Text style={styles.infoText}>Identity Verification</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons
            name={isEmailVerified ? 'check' : 'close'}
            size={24}
            color={isEmailVerified ? PRIMARY_BLUE_300 : PRIMARY_BLUE_200}
          />
          <Text style={styles.infoText}>Email Verification</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="close" size={24} color={PRIMARY_BLUE_200} />
          <Text style={styles.infoText}>Phone Verification</Text>
        </View>
      </View>
    </View>
  );
};

export default HostVerifiedInfo;
