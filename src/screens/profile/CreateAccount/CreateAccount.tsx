import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon, Input, ProfileImageUploader, Text, showAlert } from 'src/components';
import { LanguageSelector, CountrySelector } from 'src/components/modals';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getAccountError, getAccountLoader } from 'src/store/selectors';
import { accountActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { CreateAccountFormValues } from 'src/types';
import { GenderOptionsProps, Country, Gender, Language, CountryOption } from 'src/types/common';
import { IconName, ThemeType } from 'src/types/ui';
import { ACCOUNT_NAME_MAX_LENGTH, UZBEK_PHONE_NUMBER_LENGTH } from 'src/utils';

import { styles } from './CreateAccount.style';
import { validateForm } from './CreateAccount.utils';

const genderOptions = [
  { label: 'Male', value: Gender.Male },
  { label: 'Female', value: Gender.Female },
];

const CreateAccountForm = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const accountError = useSelector(getAccountError);
  const loading = useSelector(getAccountLoader);

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<CreateAccountFormValues>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: Gender.Male,
    description: '',
    country: Country.UZBEKISTAN,
    language: Language.English,
    uiTheme: ThemeType.Light,
  });

  const formIsValid = !Object.values(validationErrors).some((error) => error.trim() !== '');

  const handleInputChange = (fieldName: keyof CreateAccountFormValues, text: string) => {
    setFormValues({ ...formValues, [fieldName]: text });
  };

  const handleCountrySelect = (country: CountryOption) => {
    setFormValues({ ...formValues, country: country.name });
  };

  const handlePhotoSelect = (imageUrl: string) => {
    setFormValues({ ...formValues, imageUrl });
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
      if (!response.payload.error) {
        showAlert('success', {
          message: 'Successfully created!',
          onOkPressed: () => navigation.navigate('Profile'),
        });
      }
    } else {
      setValidationErrors(errors);
    }
  };

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
      <FormTemplate
        onSubmit={handleOnSubmit}
        formIsValid={formIsValid}
        loading={loading}
        error={accountError}
      >
        <View style={styles.header}>
          <ProfileImageUploader onPhotoSelect={handlePhotoSelect} />
        </View>

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

        <Input
          contextMenuHidden
          error={validationErrors.phoneNumber}
          keyboardType="number-pad"
          leftIcon={IconName.Phone}
          maxLength={UZBEK_PHONE_NUMBER_LENGTH}
          onChangeText={(text: string) => handleInputChange('phoneNumber', text)}
          placeholder="Enter your number"
          value={formValues.phoneNumber}
          underlineColorAndroid="transparent"
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
        <CountrySelector onSelect={handleCountrySelect} />

        <Text style={styles.label}>Select preffered language</Text>
        <LanguageSelector onSelect={handleLanguageSelect} />

        <Text style={styles.label}>Tell about yourself</Text>
        <Input
          multiline
          numberOfLines={4}
          placeholder="Enter your description"
          value={formValues.description}
          onChangeText={(text: string) => handleInputChange('description', text)}
          style={styles.textAreaStyles}
        />
      </FormTemplate>
    </ScreenTemplate>
  );
};

export default CreateAccountForm;
