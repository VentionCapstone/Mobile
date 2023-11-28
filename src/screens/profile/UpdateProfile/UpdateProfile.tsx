import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AsyncThunks, getUserError, getUserLoading, useAppDispatch, userActions } from 'src/api';
import { CountrySelector, Icon, ProfileImageUploader, Input, Text } from 'src/components';
import { LanguageSelector } from 'src/components/Modals';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { user } from 'src/data';
import { useTheme } from 'src/theme';
import { ProfileFormValues, GenderOptionsProps, GenderType } from 'src/types';
import { IconName } from 'src/types/ui';
import { ACCOUNT_NAME_MAX_LENGTH, UZBEK_PHONE_NUMBER_LENGTH } from 'src/utils';

import { styles } from './UpdateProfile.style';
import { validateForm } from './UpdateProfile.utils';

const genderOptions = [
  { label: 'Male', value: GenderType.Male },
  { label: 'Female', value: GenderType.Female },
];

const UpdateProfile = () => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const userError = useSelector(getUserError);
  const loading = useSelector(getUserLoading);
  const userId = '1';

  const [formValues, setFormValues] = useState<ProfileFormValues>(user);
  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [photo, setPhoto] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const formIsValid = Object.keys(validationErrors).length === 0;

  const handleInputChange = (fieldName: keyof ProfileFormValues, text: string) => {
    setValidationErrors({});
    setFormValues({ ...formValues, [fieldName]: text });
  };

  const handleCountrySelect = (country: string) => {
    setValidationErrors({});
    setFormValues({ ...formValues, country });
  };

  const handleLanguageSelect = (language: string) => {
    setValidationErrors({});
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
          style={[styles.textAreaStyles, { color: colors.text }]}
        />
      </FormTemplate>
    </ScreenTemplate>
  );
};

export default UpdateProfile;
