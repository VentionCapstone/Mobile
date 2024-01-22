import { StyleSheet } from 'react-native';
import { title1, paragraph1, LEVEL_1 } from 'src/styles';

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...title1,
  },
  description: {
    ...paragraph1,
  },
  imageContainer: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    backgroundColor: 'blue',
    borderRadius: 100,
    overflow: 'hidden',
    ...LEVEL_1,
  },
  editButton: {
    width: '100%',
    height: 40,
    bottom: 0,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    gap: 4,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  radioLabel: {
    marginLeft: 8,
  },
  textAreaStyles: {
    textAlignVertical: 'top',
  },
  countrySelectorContainer: {
    height: 50,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  selectedCountry: {
    ...paragraph1,
  },
  countryItem: {
    padding: 15,
    ...paragraph1,
  },
  optionText: {
    ...paragraph1,
  },
});
