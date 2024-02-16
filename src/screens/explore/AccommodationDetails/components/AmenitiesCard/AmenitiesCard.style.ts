import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  amenitiesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  badgeText: {
    fontSize: 15,
  },
});
