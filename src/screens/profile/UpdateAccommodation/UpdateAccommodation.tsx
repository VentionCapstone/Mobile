import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { DateTimePicker, Input, NumericInput, showAlert } from 'src/components';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getMyAccommodationsLoader } from 'src/store/selectors';
import { accommodationActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { UpdateAccommodationValues } from 'src/types';
import { AREA_MAX_LENGTH, PEOPLE_MAX_LENGTH, PRICE_MAX_LENGTH, ROOMS_MAX_LENGTH } from 'src/utils';

import { styles } from './UpdateAccommodation.style';
import { validateForm } from './UpdateAccommodation.utils';

type Props = NativeStackScreenProps<RootStackParamList, 'UpdateAccommodation'>;

const UpdateAccommodation = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();
  const loading = useSelector(getMyAccommodationsLoader);
  const existingAccommodation = route.params.accommodation;

  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState<UpdateAccommodationValues>({
    title: existingAccommodation.title,
    allowedNumberOfPeople: existingAccommodation.allowedNumberOfPeople,
    availableTo: existingAccommodation.availableTo,
    availableFrom: existingAccommodation.availableFrom,
    description: existingAccommodation.description,
    numberOfRooms: existingAccommodation.numberOfRooms,
    price: existingAccommodation.price,
    timezoneOffset: existingAccommodation.timezoneOffset,
    previewImgUrl: existingAccommodation.previewImgUrl,
    squareMeters: existingAccommodation.squareMeters,
    thumbnailUrl: existingAccommodation.thumbnailUrl,
    address: {
      country: existingAccommodation.address.country,
      city: existingAccommodation.address.city,
      street: existingAccommodation.address.street,
      zipCode: existingAccommodation.address.zipCode,
      latitude: existingAccommodation.address.latitude,
      longitude: existingAccommodation.address.longitude,
    },
  });

  const formIsValid = !Object.values(validationErrors).some((error) => error.trim() !== '');

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
      const response = await dispatch(
        AsyncThunks.updateAccommodation({
          accommodationId: existingAccommodation.id,
          accommodation: formValues,
        })
      );

      if (response.payload?.success) {
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
  }, [formValues, formInteracted]);

  useEffect(() => {
    dispatch(accommodationActions.clearError());
  }, []);

  return (
    <ScreenTemplate>
      <FormTemplate onSubmit={handleOnSubmit} formIsValid={formIsValid} loading={loading}>
        <View style={styles.inputColumn}>
          <DateTimePicker
            label="Available from"
            initialValue={existingAccommodation.availableFrom}
            onDateChange={handleSelectAvailableFrom}
          />

          <DateTimePicker
            label="Available to"
            initialValue={existingAccommodation.availableTo}
            onDateChange={handleSelectAvailableTo}
          />
        </View>

        <NumericInput
          label="Price [$]"
          maxLength={PRICE_MAX_LENGTH}
          value={formValues.price}
          onChangeText={(value: number | null) => handleInputChange('price', value)}
          error={validationErrors.price}
        />

        <NumericInput
          label="Rooms"
          maxLength={ROOMS_MAX_LENGTH}
          value={formValues.numberOfRooms}
          onChangeText={(value: number | null) => handleInputChange('numberOfRooms', value)}
          error={validationErrors.numberOfRooms}
        />

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
