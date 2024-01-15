import { StyleSheet } from 'react-native';

import { GREY_300, RED_200 } from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'center',
  },
  chip: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: 170,
    height: 140,
    borderWidth: 1,
    borderColor: GREY_300,
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    gap: 15,
    borderRadius: 15,
  },
  chipAdded: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: 170,
    height: 140,
    borderWidth: 3,
    borderColor: RED_200,
    padding: 15,
    marginBottom: 10,
    gap: 15,
    borderRadius: 15,
  },
  chipFont: {
    fontSize: 16,
    color: 'grey',
  },
  chipFontFocused: {
    fontSize: 16,
    fontWeight: 'bold',
    color: RED_200,
  },
});
