import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from 'src/components';
import { getColors } from 'src/store/selectors';
import { PRIMARY_BLUE_200, title1, title3, GREY_300, subtitle1, WHITE_100 } from 'src/styles';
import { HostProfile } from 'src/types';
import { PADDING_HORIZONTAL_28 } from 'src/utils';

interface Props {
  host: HostProfile;
}

const HostProfileCard = ({ host }: Props) => {
  const colors = useSelector(getColors);

  const { imageUrl, firstName, lastName, isVerified, rating, accommodations, reviews } = host;

  return (
    <View style={styles.container}>
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
          <Text style={styles.statsCount}>{reviews.count}</Text>
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
          <Text style={styles.statsCount}>{accommodations?.length}</Text>
          <Text style={styles.statsLabel}>Listings</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: PADDING_HORIZONTAL_28,
  },
  userContainer: {
    marginTop: 36,
    flex: 6,
    marginBottom: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: WHITE_100,
    borderWidth: 1,
  },
  verifiedIcon: {
    position: 'absolute',
    bottom: -2,
    right: 0,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    ...title1,
  },
  subtitle: {
    ...title3,
    fontWeight: 'normal',
    color: GREY_300,
  },
  statsContainer: {
    flex: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statsItem: {
    alignItems: 'center',
  },
  statsCount: {
    ...subtitle1,
    fontWeight: '600',
  },
  statsLabel: {
    fontSize: 12,
    color: GREY_300,
  },
  rating: {
    paddingLeft: 2,
  },
});

export default HostProfileCard;
