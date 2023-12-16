import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { DatePicker, Input, NumericInput, Text } from 'src/components';
import { AddressSelector } from 'src/components/modals';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getAccommodationError } from 'src/store/selectors';
import { accommodationActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { AddressValues, CreateAccommodationValues } from 'src/types';

import { styles } from './CreateAccommodation.style';
import { validateForm } from './CreateAccommodation.utils';

const CreateAccommodation = () => {
  const dispatch = useAppDispatch();
  const accommodationError = useSelector(getAccommodationError);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [addressError, setAddressError] = useState<boolean>(false);
  const [addressValues, setAddressValues] = useState<AddressValues | undefined>();
  const [formValues, setFormValues] = useState<CreateAccommodationValues>({
    squareMeters: null,
    numberOfRooms: null,
    price: null,
    availableFrom: '',
    availableTo: '',
    availability: true,
    description: '',
  });

  const formIsValid = !Object.values(validationErrors).some((error) => error.trim() !== '');

  const handleDateChange = (fieldName: 'availableFrom' | 'availableTo', selectedDate: string) => {
    setFormValues({ ...formValues, [fieldName]: selectedDate });
  };

  const handleSelectAddressValues = (values: AddressValues) => {
    setAddressValues(values);
  };

  const handleInputChange = (
    fieldName: keyof CreateAccommodationValues,
    value: string | number
  ) => {
    setFormValues({ ...formValues, [fieldName]: value });
  };

  const mockAddressValues = {
    country: 'Uzb',
    city: 'Urgut',
    street: 'Huvaydo',
    zipCode: '12123',
    longitude: 0,
    latitude: 0,
  };

  const thumbnailUrl = 'https://example.com';

  const handleOnSubmit = async () => {
    setFormInteracted(true);
    const errors = validateForm(formValues);

    if (Object.keys(errors).length === 0) {
      // if (addressValues === undefined) {
      //   setAddressError(true);
      //   return;
      // }

      dispatch(accommodationActions.clearError());
      const response = await dispatch(
        AsyncThunks.createAccommodation({
          accommodation: { ...formValues, thumbnailUrl },
          address: mockAddressValues,
        })
      );

      const { id } = response.payload.data;
      if (response && response.payload.success) {
        navigation.navigate('AddAccommodationImage', { accommodationId: id });
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
        error={formIsValid ? accommodationError : undefined}
      >
        <View style={styles.inputRow}>
          <DatePicker
            label="Available from*"
            placeholder="yyyy/mm/dd"
            value={formValues.availableFrom}
            onDateChange={(selectedDate: string) => handleDateChange('availableFrom', selectedDate)}
            width={180}
            error={validationErrors.availableFrom}
          />
          <DatePicker
            label="Available to*"
            placeholder="yyyy/mm/dd"
            value={formValues.availableTo}
            onDateChange={(selectedDate: string) => handleDateChange('availableTo', selectedDate)}
            width={180}
            error={validationErrors.availableTo}
          />
        </View>

        <View style={styles.inputRow}>
          <NumericInput
            style={{ width: 180 }}
            label="Price [$]"
            value={formValues.price}
            onChangeText={(value: string) => handleInputChange('price', value)}
            error={validationErrors.price}
          />

          <NumericInput
            style={{ width: 180 }}
            label="Rooms"
            value={formValues.numberOfRooms}
            onChangeText={(value: number) => handleInputChange('numberOfRooms', value)}
            error={validationErrors.numberOfRooms}
          />
        </View>

        <NumericInput
          label="Area [m²]*"
          value={formValues.squareMeters}
          onChangeText={(value: number) => handleInputChange('squareMeters', value)}
          error={validationErrors.squareMeters}
        />

        <Text style={styles.addressLabel}>Address</Text>
        <AddressSelector
          onSelect={handleSelectAddressValues}
          addressError={addressError}
          setAddressError={setAddressError}
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

export default CreateAccommodation;
