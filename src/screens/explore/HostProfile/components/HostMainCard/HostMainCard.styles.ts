import { StyleSheet } from 'react-native';
import { GREY_300, subtitle1, WHITE_100, title1, title3 } from 'src/styles';

const styles = StyleSheet.create({
  userContainer: {
    marginBottom: 16,
    alignItems: 'center',
    paddingVertical: 40,
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

export default styles;
