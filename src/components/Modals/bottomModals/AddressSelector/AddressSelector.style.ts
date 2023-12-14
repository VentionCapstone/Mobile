import { StyleSheet } from 'react-native';
import { title2, paragraph1 } from 'src/styles';
import { HORIZONTAL_20_PERCENT } from 'src/utils';

export const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
  },
  searchInputContainer: {
    width: '90%',
    height: 70,
    justifyContent: 'center',
  },
  searchInput: {
    marginTop: 10,
    borderRadius: 30,
  },
  addressContainer: {
    paddingHorizontal: HORIZONTAL_20_PERCENT,
    gap: 20,
  },
  addressDescriptionContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    ...title2,
  },
  addressLabel: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  labelText: {
    ...paragraph1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
