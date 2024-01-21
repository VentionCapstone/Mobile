import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import Text from 'src/components/Text/Text';
import { Input } from 'src/components/inputs';
import { StepperTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { ACCOMMODATION_DESCRIPTION_MAX_LENGTH } from 'src/utils';

import { styles } from './AccommodationDescription.style';

type Props = NativeStackScreenProps<RootStackParamList, 'AccommodationDate'>;

const AccommodationDescription = ({ route, navigation }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [descriptionLength, setDescriptionLength] = useState<number>(0);

  const handleTextChange = (text: string) => {
    setDescription(text);
    setDescriptionLength(text.length);
  };

  const handleNext = useCallback(() => {
    const accommodation = { ...route.params.accommodation, description };

    navigation.navigate('AccommodationDescription', { accommodation });
  }, [navigation, description, route.params.accommodation]);

  const isNextButtonDisabled = description === '';

  return (
    <StepperTemplate onNext={handleNext} disableNextButton={isNextButtonDisabled}>
      <View style={styles.container}>
        <Text style={styles.title}>Create your description</Text>
        <Text style={styles.subtitle}>Share what makes your place special </Text>

        <Input
          multiline
          numberOfLines={6}
          placeholder="describe your accommodation"
          onChangeText={handleTextChange}
          value={description}
          maxLength={ACCOMMODATION_DESCRIPTION_MAX_LENGTH}
          innerStyle={styles.descriptionInput}
        />
        <Text>
          {descriptionLength}/{ACCOMMODATION_DESCRIPTION_MAX_LENGTH}
        </Text>
      </View>
    </StepperTemplate>
  );
};

export default AccommodationDescription;
