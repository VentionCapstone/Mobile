import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { DatePicker, Input, NumericInput } from 'src/components';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { useAppDispatch } from 'src/store';
import { getAccommodationError } from 'src/store/selectors';
import { accommodationActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { AccommodationFormValues } from 'src/types';

import { styles } from './CreateAccommodation.style';
import { validateForm } from './CreateAccommodation.utils';

const CreateAccommodation = () => {
  const dispatch = useAppDispatch();
  const accommodationError = useSelector(getAccommodationError);

  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState<AccommodationFormValues>({
    squareMeters: 0,
    numberOfRooms: 0,
    price: 0,
    availibility: true,
    availableFrom: '',
    availableTo: '',
    description: '',
    address: '',
  });

  const formIsValid = Object.keys(validationErrors).length === 0;

  const handleDateChange = (fieldName: 'availableFrom' | 'availableTo', selectedDate: string) => {
    setFormValues({ ...formValues, [fieldName]: selectedDate });
  };

  const handleInputChange = (fieldName: keyof AccommodationFormValues, value: string | number) => {
    setFormValues({ ...formValues, [fieldName]: value });
  };

  const handleOnSubmit = async () => {
    setFormInteracted(true);

    if (formIsValid) {
      await dispatch(AsyncThunks.createAccommodation(formValues));
    }
  };

  useEffect(() => {
    if (formInteracted) {
      const errors = validateForm(formValues);
      setValidationErrors(errors);

      if (formIsValid) {
        dispatch(accommodationActions.clearError());
      }
    }
  }, [formValues, formInteracted, dispatch]);

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
            label="Check-in*"
            placeholder="yyyy/mm/dd"
            value={formValues.availableFrom}
            onDateChange={(selectedDate) => handleDateChange('availableFrom', selectedDate)}
            width={180}
            error={validationErrors.availableFrom}
          />
          <DatePicker
            label="Check-out*"
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

        <Input
          label="Address"
          onChangeText={(value) => handleInputChange('address', value)}
          error={validationErrors.address}
        />

        <Input
          multiline
          numberOfLines={4}
          label="Description"
          placeholder="enter additional information"
          innerStyle={styles.textArea}
          onChangeText={(value) => handleInputChange('description', value)}
          error={validationErrors.description}
        />
      </FormTemplate>
    </ScreenTemplate>
  );
};

export default CreateAccommodation;
