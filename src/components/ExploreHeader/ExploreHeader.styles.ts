import { StyleSheet } from 'react-native';
import { GREY_300, GREY_400, GREY_500, WHITE_100 } from 'src/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 14,
    height: 60,
    width: 280,
    marginVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    backgroundColor: '#fff',
  },
  searchContent: {
    justifyContent: 'flex-start',
    gap: 3,
  },
  searchHeader: {
    fontWeight: 'bold',
  },
  filter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 45,
    marginVertical: 10,
    border: 'solid',
    borderRadius: 100,
    borderColor: GREY_500,
    borderWidth: 0.5,
    backgroundColor: '#fff',
  },
  darkModeShadow: {
    shadowColor: '#fff',
  },
  darkModeBorder: {
    borderColor: WHITE_100,
    borderWidth: 0.5,
  },
});

export default styles;
