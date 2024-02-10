import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from 'src/components';
import { getColors } from 'src/store/selectors';
import { HostProfile } from 'src/types';

import styles from './HostAbout.styles';

interface Props {
  host: HostProfile;
}

const HostAbout = ({ host }: Props) => {
  const colors = useSelector(getColors);

  const { firstName, createdAt, language, country, description } = host;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{firstName}'s About</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <MaterialIcons name="person-add" size={24} color={colors.icon} />
          <Text style={styles.infoText}>{`Joined: ${dayjs(createdAt).format('MMM YYYY')}`}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="language" size={24} color={colors.icon} />
          <Text style={styles.infoText}>{`Language: ${language}`}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="location-city" size={24} color={colors.icon} />
          <Text style={styles.infoText}>{`Lives in: ${country}`}</Text>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default HostAbout;
