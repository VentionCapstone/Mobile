import { StyleSheet } from 'react-native';
import { GREY_300, LEVEL_1, paragraph2, title3 } from 'src/styles';
import { PADDING_HORIZONTAL_20 } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: PADDING_HORIZONTAL_20,
    paddingVertical: 20,
  },
  header: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    position: 'absolute',
    zIndex: 1,
    top: 8,
    left: 0,
    right: 0,
  },
  imagePlaceholder: {
    height: 250,
    width: '100%',
    backgroundColor: GREY_300,
  },
  icon: {
    flexDirection: 'row',
    borderRadius: 100,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    ...LEVEL_1,
  },
  imageContainer: {
    width: '100%',
    height: 250,
  },
  titleContainer: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 5,
  },
  address: {
    fontSize: 16,
  },
  headTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    ...paragraph2,
  },
  description: {
    ...title3,
    fontWeight: '500',
    marginTop: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    gap: 30,
    ...LEVEL_1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    height: 80,
  },
});
