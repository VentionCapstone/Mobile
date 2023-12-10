import { ReactNode } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'src/components/Button';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import { getColors } from 'src/store/selectors';
import { RED_300 } from 'src/styles';
import { ErrorResponseType } from 'src/types';
import { IconName } from 'src/types/ui';

import { styles } from './FormTemplate.style';

interface Props {
  children: ReactNode;
  formIsValid?: boolean;
  onSubmit: () => void;
  loading?: boolean;
  error?: ErrorResponseType | null;
}

const FormTemplate = ({ children, formIsValid = true, onSubmit, loading, error }: Props) => {
  const colors = useSelector(getColors);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {children}

        {error && (
          <View style={[styles.errorContainer, { backgroundColor: colors.errorBackground }]}>
            <View style={styles.errorIconContainer}>
              <Icon name={IconName.Error} iconSet="material" color={RED_300} size={20} />
              <Text style={styles.label}>Error!</Text>
            </View>
            <Text style={styles.errorMessage}>{error?.message}</Text>
          </View>
        )}

        <Button
          title="Submit"
          isLoading={loading}
          disabled={!formIsValid}
          marginVertical={30}
          onPress={onSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormTemplate;
