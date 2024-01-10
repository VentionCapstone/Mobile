import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Country } from 'react-native-country-picker-modal';
import { useSelector } from 'react-redux';
import {
  CountryPicker,
  Icon,
  Input,
  LanguageSelector,
  showAlert,
  Text,
  ProfileImageUploader,
  PhoneNumberInput,
} from 'src/components';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { SecureStorageKey } from 'src/constants/storage';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getAccountLoader, getColors, getUserDetails } from 'src/store/selectors';
import { accountActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { UpdateAccountFormValues } from 'src/types';
import { Gender, GenderOptionsProps } from 'src/types/common';
import { IconName, ThemeType } from 'src/types/ui';
import { ACCOUNT_NAME_MAX_LENGTH } from 'src/utils';

import { styles } from './UpdateAccount.style';
import { validateForm } from './UpdateAccount.utils';

const genderOptions = [
  { label: 'Male', value: Gender.Male },
  { label: 'Female', value: Gender.Female },
];

const UpdateAccount = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const loading = useSelector(getAccountLoader);
  const userDetails = useSelector(getUserDetails);
  const colors = useSelector(getColors);

  const [countrySelectorVisible, setCountrySelectorVisible] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    userDetails?.profile?.country ?? ''
  );
  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState<UpdateAccountFormValues>({
    firstName: userDetails?.firstName || '',
    lastName: userDetails?.lastName || '',
    phoneNumber: userDetails?.profile?.phoneNumber || '',
    gender: userDetails?.profile?.gender || Gender.Male,
    description: userDetails?.profile?.description || '',
    language: userDetails?.profile?.language || '',
    imageUrl: userDetails?.profile?.imageUrl || '',
    uiTheme: userDetails?.profile?.uiTheme || ThemeType.Light,
    country: selectedCountry || '',
  });

  const profileId = userDetails?.profile?.id;

  const formIsValid = !Object.values(validationErrors).some((error) => error.trim() !== '');

  const handleInputChange = useCallback((fieldName: string, text: string) => {
    const sanitizedText = text.replace(/\s{6,}/g, ' ');
    setFormValues((prevValues) => ({ ...prevValues, [fieldName]: sanitizedText }));
  }, []);

  const handleCountrySelect = useCallback((country: Country) => {
    setFormValues((prevValues) => ({ ...prevValues, country: country.name as string }));
    setSelectedCountry(country.name as string);
  }, []);

  const handlePhotoSelect = (imageUrl: string) => {
    setFormValues({ ...formValues, imageUrl });
  };

  const handleLanguageSelect = (language: string) => {
    setFormValues({ ...formValues, language });
  };

  const handleOnSubmit = useCallback(async () => {
    setFormInteracted(true);
    const errors = validateForm(formValues);

    if (Object.keys(errors).length === 0) {
      dispatch(accountActions.clearError());
      const response = await dispatch(AsyncThunks.updateAccount({ id: profileId, formValues }));

      if (response.meta.requestStatus === 'fulfilled') {
        showAlert('success', {
          message: 'Account details updated successfully!',
          onOkPressed: () => navigation.navigate('Profile'),
        });
        const userId = await SecureStore.getItemAsync(SecureStorageKey.USER_ID);
        if (userId) {
          await dispatch(AsyncThunks.getUserDetails(userId));
        }
      }
    } else {
      setValidationErrors(errors);
    }
  }, [formValues, profileId, dispatch, navigation]);

  useEffect(() => {
    if (formInteracted) {
      const errors = validateForm(formValues);
      setValidationErrors(errors);
    }
  }, [formValues]);

  useEffect(() => {
    dispatch(accountActions.clearError());
  }, []);

  return (
    <ScreenTemplate>
      <FormTemplate onSubmit={handleOnSubmit} formIsValid={formIsValid} loading={loading}>
        <View style={styles.header}>
          <ProfileImageUploader onPhotoSelect={handlePhotoSelect} />
        </View>

        <View>
          <Text style={styles.title}>Profile</Text>
          <Text>
            The information you share will be used across Airbnb to help other guests and Hosts get
            to know you.
          </Text>
        </View>

        <Input
          error={validationErrors.firstName}
          leftIcon={IconName.Person}
          maxLength={ACCOUNT_NAME_MAX_LENGTH}
          onChangeText={(text: string) => handleInputChange('firstName', text)}
          placeholder="Enter your firstname"
          value={formValues.firstName}
        />

        <Input
          error={validationErrors.lastName}
          leftIcon={IconName.Person}
          maxLength={ACCOUNT_NAME_MAX_LENGTH}
          onChangeText={(text: string) => handleInputChange('lastName', text)}
          placeholder="Enter your lastname"
          value={formValues.lastName}
        />

        <PhoneNumberInput
          error={validationErrors.phoneNumber}
          onChangeText={(text: string) => handleInputChange('phoneNumber', text)}
          value={formValues.phoneNumber}
        />

        <Text style={styles.label}>Select your gender</Text>
        {genderOptions.map((option: GenderOptionsProps) => (
          <TouchableOpacity
            key={option.value}
            style={styles.radioContainer}
            onPress={() => handleInputChange('gender', option.value)}
          >
            <Icon
              name={
                formValues.gender === option.value
                  ? IconName.RadioButtonsOn
                  : IconName.RadioButtonsOff
              }
            />
            <Text style={styles.radioLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Select your country</Text>
        <TouchableOpacity
          onPress={() => setCountrySelectorVisible(true)}
          style={[styles.selectorButton, { backgroundColor: colors.secondaryBackground }]}
        >
          <Text style={styles.selectedCountry}>{selectedCountry}</Text>
          <Icon name={IconName.ChevronDown} size={20} />
        </TouchableOpacity>
        <CountryPicker
          visible={countrySelectorVisible}
          onClose={() => setCountrySelectorVisible(false)}
          onSelect={handleCountrySelect}
        />

        <Text style={styles.label}>Select preffered language</Text>
        <LanguageSelector onSelect={handleLanguageSelect} value={formValues.language} />

        <Text style={styles.label}>Tell about yourself</Text>
        <Input
          multiline
          numberOfLines={4}
          placeholder="Enter your description"
          value={formValues.description}
          onChangeText={(text: string) => handleInputChange('description', text)}
          innerStyle={styles.textAreaStyles}
        />
      </FormTemplate>
    </ScreenTemplate>
  );
};

export default UpdateAccount;
