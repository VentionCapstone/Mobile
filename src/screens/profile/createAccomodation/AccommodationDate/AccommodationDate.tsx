import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { DateTimePicker } from 'src/components/Modals/centerModals';
import Text from 'src/components/Text/Text';
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

type Props = NativeStackScreenProps<RootStackParamList, 'AccommodationDate'>;

const AccommodationDate = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();
  const accommodationLoader = useSelector(getMyAccommodationsLoader);
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
