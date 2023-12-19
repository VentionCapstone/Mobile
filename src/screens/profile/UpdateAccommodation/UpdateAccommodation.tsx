import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { DatePicker, Input, NumericInput, Text, showAlert } from 'src/components';
import { AddressSelector } from 'src/components/modals';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { useAppDispatch } from 'src/store';
import { getAccommodationError, getAccommodationLoader } from 'src/store/selectors';
import { accommodationActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { Accommodation, AddressValues, UpdateAccommodationValues } from 'src/types';
import { AREA_MAX_LENGTH, PRICE_MAX_LENGTH, ROOMS_MAX_LENGTH } from 'src/utils';

import { styles } from '../CreateAccommodation/CreateAccommodation.style';
import { validateForm } from '../CreateAccommodation/CreateAccommodation.utils';

const UpdateAccommodation = ({ route }: { route: any }) => {
  const dispatch = useAppDispatch();
  const accommodationError = useSelector(getAccommodationError);
  const loading = useSelector(getAccommodationLoader);
  const existingAccommodation: Accommodation = route.params.accommodation;
  const existingAddress: AddressValues = existingAccommodation.address;

  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [addressError, setAddressError] = useState<boolean>(false);
  const [addressValues, setAddressValues] = useState<AddressValues | undefined>();
  const [formValues, setFormValues] = useState<UpdateAccommodationValues>(existingAccommodation);

  const formIsValid = !Object.values(validationErrors).some((error) => error.trim() !== '');

  const handleDateChange = (fieldName: 'availableFrom' | 'availableTo', selectedDate: string) => {
    setFormValues({ ...formValues, [fieldName]: selectedDate });
  };

  const handleSelectAddressValues = (values: AddressValues) => {
    setAddressValues(values);
  };

  const handleInputChange = (
    fieldName: keyof UpdateAccommodationValues,
    value: string | number
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

      if (response && response.payload.success) {
        showAlert('success', {
          message: 'Accommodation updated successfully!',
        });
      } else {
        showAlert('error', {
          message: 'Something went wrong!',
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
    dispatch(accommodationActions.clearError());
  }, []);

  return (
    <ScreenTemplate headerShown={false}>
      <FormTemplate
        onSubmit={handleOnSubmit}
        formIsValid={formIsValid}
        loading={loading}
        error={formIsValid ? accommodationError : undefined}
      >
        <View style={styles.inputRow}>
          <DatePicker
            label="Available from"
            placeholder="yyyy/mm/dd"
            value={formValues.availableFrom}
            onDateChange={(selectedDate: string) => handleDateChange('availableFrom', selectedDate)}
            width={180}
            error={validationErrors.availableFrom}
          />

          <DatePicker
            label="Available to"
            placeholder="yyyy/mm/dd"
            value={formValues.availableTo}
            onDateChange={(selectedDate: string) => handleDateChange('availableTo', selectedDate)}
            width={180}
            error={validationErrors.availableTo}
          />
        </View>

        <View style={styles.inputRow}>
          <NumericInput
            label="Price [$]"
            style={{ width: 180 }}
            maxLength={PRICE_MAX_LENGTH}
            value={formValues.price}
            onChangeText={(value: string) => handleInputChange('price', value)}
            error={validationErrors.price}
          />

          <NumericInput
            label="Rooms"
            style={{ width: 180 }}
            maxLength={ROOMS_MAX_LENGTH}
            value={formValues.numberOfRooms}
            onChangeText={(value: number) => handleInputChange('numberOfRooms', value)}
            error={validationErrors.numberOfRooms}
          />
        </View>

        <NumericInput
          label="Area [m²]"
          maxLength={AREA_MAX_LENGTH}
          value={formValues.squareMeters}
          onChangeText={(value: number) => handleInputChange('squareMeters', value)}
          error={validationErrors.squareMeters}
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
