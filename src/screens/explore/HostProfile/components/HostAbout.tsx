import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from 'src/components';
import { getColors } from 'src/store/selectors';
import { paragraph1 } from 'src/styles';
import { HostProfile } from 'src/types';

interface Props {
  host: HostProfile;
}

const HostAbout = ({ host }: Props) => {
  const colors = useSelector(getColors);

  const { firstName, joinedAt, language, country, description } = host;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{firstName}'s About</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <MaterialIcons name="person-add" size={24} color={colors.icon} />
          <Text style={styles.infoText}>{`Joined: ${dayjs(joinedAt).format('MMM YYYY')}`}</Text>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  infoText: {
    ...paragraph1,
    marginLeft: 8,
  },
  description: {
    ...paragraph1,
    fontWeight: '500',
  },
});

export default HostAbout;
