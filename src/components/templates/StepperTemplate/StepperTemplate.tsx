import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View, ViewStyle, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, ButtonType } from 'src/components/Button';
import ThemedView from 'src/components/ThemedView/ThemedView';
import { RootStackParamList } from 'src/navigation';
import { getColors } from 'src/store/selectors';
import { BUTTON_SIZES } from 'src/styles';

import { styles } from './StepperTemplate.style';

type Props = {
  onNext: () => void;
  disableNextButton?: boolean;
  displayPrevButton?: boolean;
  nextButtonTitle?: string;
  children: React.ReactNode;
  loader?: boolean;
  style?: ViewStyle;
};

const StepperTemplate = ({
  onNext,
  disableNextButton = false,
  displayPrevButton = true,
  nextButtonTitle,
  children,
  loader,
  style,
}: Props) => {
  const colors = useSelector(getColors);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();

  const handlePrev = () => {
    navigation.goBack();
  };

  const handleExit = () => {
    navigation.navigate('MyAccommodations');
  };

  return (
    <ThemedView style={[styles.container, style]}>
      <View style={styles.header}>
        <Button
          title="Exit"
          width={80}
          size={BUTTON_SIZES.SM}
          type={ButtonType.SECONDARY}
          onPress={handleExit}
        />
      </View>

      <View style={styles.innerContainer}>{children}</View>

      <View
        style={[
          styles.buttonsContainer,
          {
            width,
            borderTopColor: colors.buttonBorder,
            backgroundColor: colors.background,
            justifyContent: displayPrevButton ? 'space-between' : 'flex-end',
          },
        ]}
      >
        {displayPrevButton && (
          <Button
            title="Prev"
            size={BUTTON_SIZES.SM}
            type={ButtonType.TERTIARY}
            onPress={handlePrev}
          />
        )}

        <Button
          title={nextButtonTitle || 'Next'}
          size={BUTTON_SIZES.SM}
          onPress={onNext}
          isLoading={loader}
          disabled={disableNextButton}
          style={{ minWidth: 70 }}
        />
      </View>
    </ThemedView>
  );
};

export default StepperTemplate;
