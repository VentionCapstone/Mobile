import { NavigationProp, Route, useNavigation } from '@react-navigation/native';
import moment from 'moment-timezone';
import { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Text from 'src/components/Text/Text';
import { DateTimePicker } from 'src/components/modals/centerModals';
import { StepperTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getMyAccommodationsLoader } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { Accommodation, ApiSuccessResponseType } from 'src/types';

import { styles } from './AccommodationDate.styles';

type FormValues = {
  availableFrom: string;
  availableTo: string;
  timezoneOffset: number;
};

type Props = {
  route: Route<'AccommodationDate', { accommodation: any }>;
};

const AccommodationDate = ({ route }: Props) => {
  const dispatch = useAppDispatch();
  const accommodationLoader = useSelector(getMyAccommodationsLoader);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [dateValues, setDateValues] = useState<FormValues>({
    availableFrom: '',
    availableTo: '',
    timezoneOffset: new Date().getTimezoneOffset(),
  });

  const handleSelectAvailableFrom = (availableFrom: string) => {
    setDateValues((prevDates) => ({
      ...prevDates,
      availableFrom,
    }));
  };

  const handleSelectAvailableTo = (availableTo: string) => {
    setDateValues((prevDates) => ({
      ...prevDates,
      availableTo,
    }));
  };

  const handleNext = async () => {
    const accommodation = { ...route.params.accommodation, ...dateValues };

    const response = await dispatch(AsyncThunks.createAccommodation(accommodation));

    if (response.payload?.success) {
      const { id } = (response.payload as ApiSuccessResponseType<Accommodation>).data;

      navigation.navigate('AccommodationImage', { accommodationId: id });
    }
  };

  const isNextButtonDisabled = Object.values(dateValues).some((value) => value === '');

  return (
    <StepperTemplate
      onNext={handleNext}
      loader={accommodationLoader}
      disableNextButton={isNextButtonDisabled}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Select your house available dates</Text>

        <View style={styles.inputRow}>
          <DateTimePicker
            label="Available from"
            onDateChange={handleSelectAvailableFrom}
            maxDate={dateValues.availableTo || undefined}
          />
          <DateTimePicker
            label="Available to"
            onDateChange={handleSelectAvailableTo}
            minDate={dateValues.availableFrom || undefined}
          />
        </View>
      </View>
    </StepperTemplate>
  );
};

export default AccommodationDate;
