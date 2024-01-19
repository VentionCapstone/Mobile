import { NavigationProp, Route, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import Text from 'src/components/Text/Text';
import { NumericInput } from 'src/components/inputs';
import { StepperTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { CreateAccommodationValues } from 'src/types';
import { AREA_MAX_LENGTH, PRICE_MAX_LENGTH } from 'src/utils';

import { styles } from './AccommodationPriceAndArea.style';

interface FormValues {
  squareMeters: number | null;
  price: number | null;
}

type Props = {
  route: Route<'AccommodationTitle', { accommodation: Partial<CreateAccommodationValues> }>;
};

const AccommodationPriceAndArea = ({ route }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [formValues, setFormValues] = useState<FormValues>({
    squareMeters: null,
    price: null,
  });

  const handleInputChange = useCallback(
    (fieldName: keyof FormValues) => (value: number | null) => {
      setFormValues((prevValues) => ({
        ...prevValues,
        [fieldName]: value,
      }));
    },
    []
  );

  const handleNext = useCallback(() => {
    const accommodation = { ...route.params.accommodation, ...formValues };

    navigation.navigate('AccommodationTitle', { accommodation });
  }, [navigation, formValues, route.params.accommodation]);

  const isNextButtonDisabled = Object.values(formValues).some((value) => value === null);

  return (
    <StepperTemplate onNext={handleNext} disableNextButton={isNextButtonDisabled}>
      <View style={styles.container}>
        <Text style={styles.title}>Share Some Informations About Your Place</Text>
        <Text style={styles.subtitle}>You will add more details later</Text>

        <View>
          <NumericInput
            label="Area [m²]"
            maxLength={AREA_MAX_LENGTH}
            value={formValues.squareMeters}
            onChangeText={handleInputChange('squareMeters')}
          />

          <NumericInput
            label="Price [$]"
            maxLength={PRICE_MAX_LENGTH}
            value={formValues.price}
            onChangeText={handleInputChange('price')}
          />
        </View>
      </View>
    </StepperTemplate>
  );
};

export default AccommodationPriceAndArea;
