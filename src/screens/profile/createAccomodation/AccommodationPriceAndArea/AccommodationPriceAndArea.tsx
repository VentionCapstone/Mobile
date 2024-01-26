import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Text from 'src/components/Text/Text';
import { NumericInput } from 'src/components/inputs';
import { StepperTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { AREA_MAX_LENGTH, PRICE_MAX_LENGTH } from 'src/utils';

import { styles } from './AccommodationPriceAndArea.style';

interface FormValues {
  squareMeters: number | null;
  price: number | null;
}

type Props = NativeStackScreenProps<RootStackParamList, 'AccommodationPriceAndArea'>;

const AccommodationPriceAndArea = ({ route, navigation }: Props) => {
  const [formValues, setFormValues] = useState<FormValues>({
    squareMeters: null,
    price: null,
  });
  const { t } = useTranslation();

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
        <Text style={styles.title}>{t('Share Some Informations About Your Place')}</Text>
        <Text style={styles.subtitle}>{t('You will add more details later')}</Text>

        <View>
          <NumericInput
            label={t('Area [m²]')}
            maxLength={AREA_MAX_LENGTH}
            value={formValues.squareMeters}
            onChangeText={handleInputChange('squareMeters')}
          />

          <NumericInput
            label={t('Price [$]')}
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
