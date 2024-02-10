import { Ionicons } from '@expo/vector-icons';
import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from 'src/components';
import { getColors } from 'src/store/selectors';
import { PRIMARY_BLUE_200 } from 'src/styles';
import { HostProfile } from 'src/types';

import styles from './HostMainCard.styles';

type Props = { host: HostProfile };

const HostProfileCard = ({ host }: Props) => {
  const colors = useSelector(getColors);

  const { imageUrl, firstName, lastName, isVerified, rating, accommodations, reviews } = host;

  return (
    <View>
      <View style={styles.userContainer}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: imageUrl }} style={styles.profileImage} />
          {isVerified && (
            <Ionicons
              name="checkmark-circle"
              size={38}
              color={PRIMARY_BLUE_200}
              style={styles.verifiedIcon}
            />
          )}
        </View>
        <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.subtitle}>Host</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text style={styles.statsCount}>{reviews.count ?? 0}</Text>
          <Text style={styles.statsLabel}>Reviews</Text>
        </View>
        <View style={styles.statsItem}>
          <Text>
            <Text style={styles.statsCount}>{parseFloat(rating || '0.0').toFixed(1)}</Text>
            <View style={styles.rating}>
              <Ionicons name="star" size={16} color={colors.tint} />
            </View>
          </Text>
          <Text style={styles.statsLabel}>Rating</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsCount}>{accommodations?.length ?? 1}</Text>
          <Text style={styles.statsLabel}>Listings</Text>
        </View>
      </View>
    </View>
  );
};

export default HostProfileCard;
