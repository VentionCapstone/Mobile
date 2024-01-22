import { StyleSheet } from 'react-native';
import { BLACK, GREY_300 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(0,0,0,0)',
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: BLACK,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  title: {
    fontSize: 25,
  },
  headTitle: {
    fontSize: 35,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  subtitle: { fontSize: 16 },
  description: {
    fontSize: 18,
  },
  descriptionContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amenitiesTitle: {
    fontSize: 25,
    marginVertical: 15,
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    height: 120,
  },
});
