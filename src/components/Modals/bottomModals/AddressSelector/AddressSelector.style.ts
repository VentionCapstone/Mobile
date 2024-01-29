import { StyleSheet } from 'react-native';
import { title2, paragraph1 } from 'src/styles';
import { PADDING_HORIZONTAL_20 } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    height: 400,
  },
  mapContainer: {
    width: '100%',
    height: 260,
    alignItems: 'center',
  },
  searchInputContainer: {
    width: '95%',
    justifyContent: 'center',
    marginTop: 20,
  },
  searchText: {
    ...title2,
    alignSelf: 'center',
  },
  addressContainer: {
    paddingHorizontal: PADDING_HORIZONTAL_20,
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
    borderWidth: 1,
  },
  labelText: {
    ...paragraph1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  saveButton: {
    marginBottom: 20,
  },
});
