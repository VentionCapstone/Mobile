import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { AddressSelector, DatePicker, Input, NumericInput, Text } from 'src/components';
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

  const formIsValid = Object.keys(validationErrors).length === 0;

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

  const ownerId = '619d621c-b393-4c5e-8abe-babfac232f6a';

  const handleOnSubmit = async () => {
    setFormInteracted(true);

    // if (!addressValues) {
    //   alert('address should be filled!');
    // }

    const response = await dispatch(
      AsyncThunks.createAccommodation({
        accommodation: { ...formValues, ownerId },
        address: mockAddressValues,
      })
    );

    // const { id } = response;
    //mock
    const id = '9b2ce24e-a16f-47f7-a396-dca66a8d5c60';

    // if (response.success) {
    navigation.navigate('AddAccommodationImage', { accommodationId: id });
    // }
  };

  useEffect(() => {
    if (formInteracted) {
      const errors = validateForm(formValues);
      setValidationErrors(errors);

      if (formIsValid) {
        dispatch(accommodationActions.clearError());
      }
    }
  }, [formValues, formInteracted]);

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
            onDateChange={(selectedDate) => handleDateChange('availableFrom', selectedDate)}
            width={180}
            error={validationErrors.availableFrom}
          />
          <DatePicker
            label="Available to*"
            placeholder="yyyy/mm/dd"
            value={formValues.availableTo}
            onDateChange={(selectedDate) => handleDateChange('availableTo', selectedDate)}
            width={180}
            error={validationErrors.availableTo}
          />
        </View>

        <View style={styles.inputRow}>
          <NumericInput
            style={{ width: 180 }}
            label="Price [$]"
            value={formValues.price}
            onChangeText={(value) => handleInputChange('price', value)}
            error={validationErrors.price}
          />

          <NumericInput
            style={{ width: 180 }}
            label="Rooms"
            value={formValues.numberOfRooms}
            onChangeText={(value) => handleInputChange('numberOfRooms', value)}
            error={validationErrors.numberOfRooms}
          />
        </View>

        <NumericInput
          label="Area [m²]*"
          value={formValues.squareMeters}
          onChangeText={(value) => handleInputChange('squareMeters', value)}
          error={validationErrors.squareMeters}
        />

        <Text style={styles.addressLabel}>Address</Text>
        <AddressSelector onSelect={handleSelectAddressValues} />

        <Input
          multiline
          numberOfLines={4}
          label="Description"
          placeholder="describe your accommodation"
          innerStyle={styles.textArea}
          onChangeText={(value) => handleInputChange('description', value)}
          error={validationErrors.description}
        />
      </FormTemplate>
    </ScreenTemplate>
  );
};

export default CreateAccommodation;
