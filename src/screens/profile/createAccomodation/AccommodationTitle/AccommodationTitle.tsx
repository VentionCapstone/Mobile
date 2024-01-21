import { NavigationProp, Route, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import Text from 'src/components/Text/Text';
import { Input } from 'src/components/inputs';
import { StepperTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { CreateAccommodationValues } from 'src/types';
import { ACCOMMODATION_TITLE_MAX_LENGTH } from 'src/utils';

import { styles } from './AccommodationTitle.style';

type Props = {
  route: Route<'AccommodationDescription', { accommodation: Partial<CreateAccommodationValues> }>;
};

const AccommodationTitle = ({ route }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [title, setTitle] = useState<string>('');
  const [titleLength, setTitleLength] = useState<number>(0);

  const handleTextChange = (text: string) => {
    setTitle(text);
    setTitleLength(text.length);
  };

  const handleNext = useCallback(() => {
    const accommodation = { ...route.params.accommodation, title };

    navigation.navigate('AccommodationDescription', { accommodation });
  }, [navigation, title, route.params.accommodation]);

  const isNextButtonDisabled = title === '';

  return (
    <StepperTemplate onNext={handleNext} disableNextButton={isNextButtonDisabled}>
      <View style={styles.container}>
        <Text style={styles.title}>Now, let's give your house a title</Text>
        <Text style={styles.subtitle}>
          Short titles work best. Have fun with it - you can always change it later
        </Text>

        <Input
          multiline
          numberOfLines={3}
          placeholder="enter title"
          onChangeText={handleTextChange}
          value={title}
          maxLength={ACCOMMODATION_TITLE_MAX_LENGTH}
          innerStyle={styles.titleInput}
        />
        <Text>
          {titleLength}/{ACCOMMODATION_TITLE_MAX_LENGTH}
        </Text>
      </View>
    </StepperTemplate>
  );
};

export default AccommodationTitle;
