import { ReactNode } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, ViewStyle, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'src/components/Button';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import { getColors } from 'src/store/selectors';
import { RED_200 } from 'src/styles';
import { ApiErrorResponseType } from 'src/types';
import { IconName } from 'src/types/ui';

import { styles } from './FormTemplate.style';

interface Props {
  children: ReactNode;
  formIsValid?: boolean;
  onSubmit?: () => void;
  loading?: boolean;
  error?: ApiErrorResponseType | null;
  isButtonVisible?: boolean;
  style?: ViewStyle;
}

const FormTemplate = ({
  children,
  formIsValid = true,
  isButtonVisible = true,
  onSubmit,
  loading,
  error,
  style,
}: Props) => {
  const colors = useSelector(getColors);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, style]}
        keyboardShouldPersistTaps="handled"
        style={styles.scrollView}
      >
        {children}

        {error && (
          <View style={[styles.errorContainer, { backgroundColor: colors.errorBackground }]}>
            <View style={styles.errorIconContainer}>
              <Icon name={IconName.Error} iconSet="material" color={RED_200} size={20} />
              <Text style={styles.label}>Error!</Text>
            </View>
            <Text style={styles.errorMessage}>{error.error.message}</Text>
          </View>
        )}

        {isButtonVisible && onSubmit && (
          <Button
            title="Submit"
            isLoading={loading}
            disabled={!formIsValid}
            marginVertical={15}
            onPress={onSubmit}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormTemplate;
