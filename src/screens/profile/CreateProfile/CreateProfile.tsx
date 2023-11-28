import { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AsyncThunks, getUserError, getUserLoading, useAppDispatch, userActions } from 'src/api';
import {
  CountrySelector,
  Input,
  NavigationHeader,
  ProfileImageUploader,
  Text,
} from 'src/components';
import Icon from 'src/components/Icon/Icon';
import LanguageSelector from 'src/components/Modals/LanguageSelector/LanguageSelector';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { ThemeType } from 'src/theme/types';
import {
  CountryOptions,
  ProfileFormValues,
  GenderOptionsProps,
  GenderType,
  LanguageType,
} from 'src/types';
import { IconName } from 'src/types/ui';
import { ACCOUNT_NAME_MAX_LENGTH, UZBEK_PHONE_NUMBER_LENGTH } from 'src/utils';

import { styles } from './CreateProfile.style';
import { validateForm } from './CreateProfile.utils';

const genderOptions = [
  { label: 'Male', value: GenderType.Male },
  { label: 'Female', value: GenderType.Female },
];

const CreateProfileForm = () => {
  const dispatch = useAppDispatch();
  const userError = useSelector(getUserError);
  const loading = useSelector(getUserLoading);
  const userId = '1';

  const [photo, setPhoto] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<ProfileFormValues>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: GenderType.Male,
    description: '',
    country: CountryOptions.UZBEKISTAN,
    language: LanguageType.English,
    uiTheme: ThemeType.Light,
  });

  const formIsValid = Object.keys(validationErrors).length === 0;

  const handleInputChange = (fieldName: keyof ProfileFormValues, text: string) => {
    setFormValues({ ...formValues, [fieldName]: text });
  };

  const handleCountrySelect = (country: string) => {
    setFormValues({ ...formValues, country });
  };

  const handleLanguageSelect = (language: string) => {
    setFormValues({ ...formValues, language });
  };

  const handleOnSubmit = async () => {
    setFormInteracted(true);

    if (formIsValid) {
      await dispatch(AsyncThunks.createProfile({ ...formValues, photoUrl: photo, userId }));
    }
  };

  useEffect(() => {
    if (formInteracted) {
      const errors = validateForm(formValues);
      setValidationErrors(errors);
    }
  }, [formValues, formInteracted]);

  useEffect(() => {
    dispatch(userActions.clearError());
  }, []);

  return (
    <ScreenTemplate>
      <FormTemplate
        onSubmit={handleOnSubmit}
        formIsValid={formIsValid}
        loading={loading}
        error={formInteracted && formIsValid ? userError : null}
      >
        <View style={styles.header}>
          <ProfileImageUploader value={photo} setValue={setPhoto} />
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
          onChangeText={(text) => handleInputChange('firstName', text)}
          placeholder="Enter your firstname"
          value={formValues.firstName}
        />

        <Input
          error={validationErrors.lastName}
          leftIcon={IconName.Person}
          maxLength={ACCOUNT_NAME_MAX_LENGTH}
          onChangeText={(text) => handleInputChange('lastName', text)}
          placeholder="Enter your lastname"
          value={formValues.lastName}
        />

        <Input
          contextMenuHidden
          error={validationErrors.phoneNumber}
          keyboardType="number-pad"
          leftIcon={IconName.Phone}
          maxLength={UZBEK_PHONE_NUMBER_LENGTH}
          onChangeText={(text) => handleInputChange('phoneNumber', text)}
          placeholder="Enter your number"
          value={formValues.phoneNumber}
          underlineColorAndroid="transparent"
        />

        <Text style={styles.label}>Select your gender</Text>
        {genderOptions.map((option: GenderOptionsProps) => (
          <TouchableOpacity
            key={option.value}
            style={styles.radioWrapper}
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
          onChangeText={(text) => handleInputChange('description', text)}
          style={styles.textAreaStyles}
        />
      </FormTemplate>
    </ScreenTemplate>
  );
};

export default CreateProfileForm;
