import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon, ProfileImageUploader, Input, Text, showAlert } from 'src/components';
import { CountrySelector, LanguageSelector } from 'src/components/modals';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getAccountError, getAccountLoader, getUserDetails } from 'src/store/selectors';
import { accountActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { UpdateAccountFormValues } from 'src/types';
import { CountryOption, Gender, GenderOptionsProps } from 'src/types/common';
import { IconName } from 'src/types/ui';
import { ACCOUNT_NAME_MAX_LENGTH, PHONE_NUMBER_LENGTH } from 'src/utils';

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
  const userError = useSelector(getAccountError);
  const userDetails = useSelector(getUserDetails);

  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState<UpdateAccountFormValues>({
    firstName: userDetails?.firstName,
    lastName: userDetails?.lastName,
    phoneNumber: userDetails?.profile?.phoneNumber,
    gender: userDetails?.profile?.gender,
    description: userDetails?.profile?.description,
    country: userDetails?.profile?.country,
    language: userDetails?.profile?.language,
    imageUrl: userDetails?.profile?.imageUrl,
    uiTheme: userDetails?.profile?.uiTheme,
  });

  const profileId = userDetails?.profile?.id;

  const formIsValid = !Object.values(validationErrors).some((error) => error.trim() !== '');

  const handleInputChange = (fieldName: string, text: string) => {
    const sanitizedText = text.replace(/\s{6,}/g, ' ');

    setFormValues({ ...formValues, [fieldName]: sanitizedText });
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
      const response = await dispatch(AsyncThunks.updateAccount({ id: profileId, formValues }));

      if (response.payload?.success) {
        showAlert('success', {
          message: 'Account details updated successfully!',
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
        error={formInteracted && formIsValid ? userError : null}
      >
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

        <Input
          contextMenuHidden
          error={validationErrors.phoneNumber}
          keyboardType="number-pad"
          leftIcon={IconName.Phone}
          maxLength={PHONE_NUMBER_LENGTH}
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
          innerStyle={styles.textAreaStyles}
        />
      </FormTemplate>
    </ScreenTemplate>
  );
};

export default UpdateAccount;
