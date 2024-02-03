import { MaterialIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { Text } from 'src/components';
import { GREY_200, PRIMARY_BLUE_300, TOMATO, paragraph1, subtitle1 } from 'src/styles';
import { HostProfile } from 'src/types';

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
            color={isVerified ? PRIMARY_BLUE_300 : TOMATO}
          />
          <Text style={styles.infoText}>Identity Verification</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons
            name={isEmailVerified ? 'check' : 'close'}
            size={24}
            color={isEmailVerified ? PRIMARY_BLUE_300 : TOMATO}
          />
          <Text style={styles.infoText}>Email Verification</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="close" size={24} color={TOMATO} />
          <Text style={styles.infoText}>Phone Verification</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
    flex: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: GREY_200,
    padding: 20,
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 28,
  },
  title: {
    ...subtitle1,
    fontWeight: '700',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'column',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    ...paragraph1,
    marginLeft: 8,
  },
});

export default HostVerifiedInfo;
