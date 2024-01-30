import { StyleSheet } from 'react-native';
import { title3 } from 'src/styles';
import { PADDING_HORIZONTAL_12 } from 'src/utils';

export const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 60,
  },
  placesInputContainer: {
    width: '100%',
    height: 110,
    justifyContent: 'center',
    paddingHorizontal: PADDING_HORIZONTAL_12,
    paddingVertical: 10,
  },
  inputInnerContainer: {
    flexDirection: 'row',
  },
  titleContainer: {
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '500',
  },
  subtitle: {
    marginTop: 5,
    ...title3,
  },
  placesInputListView: {
    position: 'absolute',
    top: 70,
    width: '100%',
    zIndex: 999,
    maxHeight: 400,
    backgroundColor: 'red',
  },
  searchInput: {
    width: '90%',
    borderRadius: 15,
    height: 50,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  locationIcon: {
    position: 'absolute',
    left: 10,
    top: 30,
  },

  mapContainer: {
    width: '100%',
    height: 250,
    marginTop: 10,
  },
  locationListContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
