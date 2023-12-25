import { NavigationProp, Route, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Text, showAlert } from 'src/components';
import { Input, NumericInput } from 'src/components/inputs';
import { AddressSelector, DateTimePicker } from 'src/components/modals';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getAccommodationLoader } from 'src/store/selectors';
import { accommodationActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { Accommodation, AddressValues, UpdateAccommodationValues } from 'src/types';
import { AREA_MAX_LENGTH, PEOPLE_MAX_LENGTH, PRICE_MAX_LENGTH, ROOMS_MAX_LENGTH } from 'src/utils';

import { styles } from '../CreateAccommodation/CreateAccommodation.style';
import { validateForm } from '../CreateAccommodation/CreateAccommodation.utils';

interface Props {
  route: Route<'UpdateAccommodation', { accommodation: Accommodation }>;
}

const UpdateAccommodation = ({ route }: Props) => {
  const dispatch = useAppDispatch();
  const loading = useSelector(getAccommodationLoader);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const existingAccommodation = route.params.accommodation;
  const existingAddress = existingAccommodation.address;

  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [addressError, setAddressError] = useState<boolean>(false);
  const [addressValues, setAddressValues] = useState<AddressValues | undefined>();
  const [formValues, setFormValues] = useState<UpdateAccommodationValues>({
    allowedNumberOfPeople: existingAccommodation.allowedNumberOfPeople,
    availableTo: existingAccommodation.availableTo,
    availableFrom: existingAccommodation.availableFrom,
    description: existingAccommodation.description,
    numberOfRooms: existingAccommodation.numberOfRooms,
    price: existingAccommodation.price,
    previewImgUrl: existingAccommodation.previewImgUrl,
    squareMeters: existingAccommodation.squareMeters,
    thumbnailUrl: existingAccommodation.thumbnailUrl,
  });

  const formIsValid = !Object.values(validationErrors).some((error) => error.trim() !== '');

  const handleSelectAddressValues = (values: AddressValues) => {
    setAddressValues(values);
  };

  const handleSelectAvailableFrom = (availableFrom: string) => {
    setFormValues({ ...formValues, availableFrom });
  };

  const handleSelectAvailableTo = (availableTo: string) => {
    setFormValues({ ...formValues, availableTo });
  };

  const handleInputChange = (
    fieldName: keyof UpdateAccommodationValues,
    value: string | number | null
  ) => {
    const sanitizedValue = typeof value === 'string' ? value.replace(/\s{6,}/g, ' ') : value;

    setFormValues({ ...formValues, [fieldName]: sanitizedValue });
  };

  const handleOnSubmit = async () => {
    setFormInteracted(true);
    const errors = validateForm(formValues);

    if (Object.keys(errors).length === 0) {
      if (addressValues === undefined) {
        setAddressError(true);
        return;
      }

      const response = await dispatch(
        AsyncThunks.updateAccommodation({
          accommodationId: existingAccommodation.id,
          accommodation: formValues,
          address: addressValues,
        })
      );

      if (response.payload?.success) {
        showAlert('success', {
          message: 'Accommodation updated successfully!',
        });
        navigation.navigate('MyAccommodations');
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
    dispatch(accommodationActions.clearError());
  }, []);

  return (
    <ScreenTemplate headerShown={false}>
      <FormTemplate onSubmit={handleOnSubmit} formIsValid={formIsValid} loading={loading}>
        <View style={styles.inputRow}>
          <DateTimePicker
            width={180}
            label="Available from"
            initialValue={existingAccommodation.availableFrom}
            onDateChange={handleSelectAvailableFrom}
            error={validationErrors.availableFrom}
          />

          <DateTimePicker
            width={180}
            label="Available to"
            initialValue={existingAccommodation.availableTo}
            onDateChange={handleSelectAvailableTo}
            error={validationErrors.availableTo}
          />
        </View>

        <View style={styles.inputRow}>
          <NumericInput
            label="Price [$]"
            style={{ width: 180 }}
            maxLength={PRICE_MAX_LENGTH}
            value={formValues.price}
            onChangeText={(value: number | null) => handleInputChange('price', value)}
            error={validationErrors.price}
          />

          <NumericInput
            label="Rooms"
            style={{ width: 180 }}
            maxLength={ROOMS_MAX_LENGTH}
            value={formValues.numberOfRooms}
            onChangeText={(value: number | null) => handleInputChange('numberOfRooms', value)}
            error={validationErrors.numberOfRooms}
          />
        </View>

        <NumericInput
          label="Area [m²]"
          maxLength={AREA_MAX_LENGTH}
          value={formValues.squareMeters}
          onChangeText={(value: number | null) => handleInputChange('squareMeters', value)}
          error={validationErrors.squareMeters}
        />

        <NumericInput
          label="Number of people"
          maxLength={PEOPLE_MAX_LENGTH}
          value={formValues.allowedNumberOfPeople}
          onChangeText={(value: number | null) => handleInputChange('allowedNumberOfPeople', value)}
          error={validationErrors.allowedNumberOfPeople}
        />

        <Text style={styles.addressLabel}>Address</Text>
        <AddressSelector
          onSelect={handleSelectAddressValues}
          addressError={addressError}
          setAddressError={setAddressError}
          existingAddress={existingAddress}
        />

        <Input
          multiline
          numberOfLines={4}
          label="Description"
          placeholder="describe your accommodation"
          innerStyle={styles.textArea}
          onChangeText={(value: string) => handleInputChange('description', value)}
          error={validationErrors.description}
        />
      </FormTemplate>
    </ScreenTemplate>
  );
};

export default UpdateAccommodation;
