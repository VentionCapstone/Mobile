import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Country } from 'react-native-country-picker-modal';
import { useSelector } from 'react-redux';
import {
  Icon,
  Text,
  Input,
  PhoneNumberInput,
  LanguageSelector,
  CountryPicker,
} from 'src/components';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getAccountLoader, getColors } from 'src/store/selectors';
import { accountActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { CreateAccountFormValues } from 'src/types';
import { GenderOptionsProps, Gender, Language } from 'src/types/common';
import { IconName, ThemeType } from 'src/types/ui';
import { ACCOUNT_NAME_MAX_LENGTH } from 'src/utils';

import { styles } from './CreateAccount.style';
import { genderOptions, validateForm } from './CreateAccount.utils';

const CreateAccountForm = () => {
  const dispatch = useAppDispatch();
  const colors = useSelector(getColors);
  const loading = useSelector(getAccountLoader);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [countrySelectorVisible, setCountrySelectorVisible] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<CreateAccountFormValues>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: Gender.Male,
    description: '',
    country: '',
    language: Language.English,
    uiTheme: ThemeType.Light,
    imageUrl: '',
  });

  const formIsValid = !Object.values(validationErrors).some((error) => error.trim() !== '');

  const handleInputChange = (fieldName: keyof CreateAccountFormValues, text: string) => {
    const sanitizedText = text.replace(/\s{6,}/g, ' ');

    setFormValues({ ...formValues, [fieldName]: sanitizedText });
  };

  const handleCountrySelect = (country: Country) => {
    setFormValues({ ...formValues, country: country.name as string });
    setSelectedCountry(country.name as string);
  };

  const handleLanguageSelect = (language: string) => {
    setFormValues({ ...formValues, language });
  };

  const handleOnSubmit = async () => {
    setFormInteracted(true);
    const errors = validateForm(formValues);

    if (Object.keys(errors).length === 0) {
      dispatch(accountActions.clearError());
      const response = await dispatch(AsyncThunks.createAccount(formValues));

      if (response.meta.requestStatus === 'fulfilled') {
        navigation.navigate('ProfileImage');
      } else {
        setValidationErrors(errors);
      }
    }
  };

  useEffect(() => {
    if (formInteracted) {
      const errors = validateForm(formValues);
      setValidationErrors(errors);
    }
  }, [formValues, formInteracted]);

  useEffect(() => {
    dispatch(accountActions.clearError());
  }, [dispatch]);

  return (
    <ScreenTemplate>
      <FormTemplate onSubmit={handleOnSubmit} formIsValid={formIsValid} loading={loading}>
        <View style={{ gap: 10 }}>
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
          label="Phone number"
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
          <Text style={styles.selectedCountry}>
            {selectedCountry ? selectedCountry : 'Select country'}
          </Text>
          <Icon name={IconName.ChevronDown} size={20} />
        </TouchableOpacity>
        <CountryPicker
          visible={countrySelectorVisible}
          onClose={() => setCountrySelectorVisible(false)}
          onSelect={handleCountrySelect}
        />

        <Text style={styles.label}>Select preffered language</Text>
        <LanguageSelector onSelect={handleLanguageSelect} />

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

export default CreateAccountForm;
