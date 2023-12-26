import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import {
  Text,
  Input,
  NumericInput,
  AddressSelector,
  DateTimePicker,
  Alert,
  showAlert,
} from 'src/components';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getAccommodationLoader } from 'src/store/selectors';
import { accommodationActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import {
  Accommodation,
  AddressValues,
  ApiSuccessResponseType,
  CreateAccommodationValues,
} from 'src/types';
import { AREA_MAX_LENGTH, PEOPLE_MAX_LENGTH, PRICE_MAX_LENGTH, ROOMS_MAX_LENGTH } from 'src/utils';

import { styles } from './CreateAccommodation.style';
import { validateForm } from './CreateAccommodation.utils';

const CreateAccommodation = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const loading = useSelector(getAccommodationLoader);

  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [addressValues, setAddressValues] = useState<AddressValues | undefined>();
  const [formValues, setFormValues] = useState<CreateAccommodationValues>({
    squareMeters: null,
    numberOfRooms: null,
    price: null,
    allowedNumberOfPeople: null,
    availableFrom: '',
    availableTo: '',
    description: '',
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
    fieldName: keyof CreateAccommodationValues,
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
        showAlert('error', {
          message: 'You should add accommodation address',
        });
        return;
      }

      dispatch(accommodationActions.clearError());
      const response = await dispatch(
        AsyncThunks.createAccommodation({
          accommodation: formValues,
          address: addressValues,
        })
      );

      if (response.payload?.success) {
        const { id } = (response.payload as ApiSuccessResponseType<Accommodation>).data;
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
      <FormTemplate onSubmit={handleOnSubmit} formIsValid={formIsValid} loading={loading}>
        <View style={styles.inputRow}>
          <DateTimePicker
            width={180}
            label="Available from"
            onDateChange={handleSelectAvailableFrom}
            error={validationErrors.availableFrom}
          />
          <DateTimePicker
            width={180}
            label="Available to"
            onDateChange={handleSelectAvailableTo}
            error={validationErrors.availableTo}
          />
        </View>

        <View style={styles.inputRow}>
          <NumericInput
            style={{ width: 180 }}
            label="Price [$]"
            maxLength={PRICE_MAX_LENGTH}
            value={formValues.price}
            onChangeText={(value: number | null) => handleInputChange('price', value)}
            error={validationErrors.price}
          />

          <NumericInput
            style={{ width: 180 }}
            label="Rooms"
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
        <AddressSelector onSelect={handleSelectAddressValues} />

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
