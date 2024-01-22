import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Text, Input, showAlert } from 'src/components';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation/RootStackNavigator.types';
import { useAppDispatch } from 'src/store';
import { getAccountLoader } from 'src/store/selectors';
import { accountActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { SignUpParams } from 'src/types';
import { EMAIL_MAX_LENGTH } from 'src/utils';

import { validateForm } from './Signup.utils';
import styles from '../auth.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const Signup = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const loading = useSelector(getAccountLoader);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<SignUpParams>({
    email: '',
    password: '',
    confirm_password: '',
  });

  const formIsValid = !Object.values(validationErrors).some((error) => error.trim() !== '');

  const handleInputChange = (field: string, value: string) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleSignup = async () => {
    setFormInteracted(true);
    const errors = validateForm(formValues);

    if (Object.keys(errors).length !== 0) {
      setValidationErrors(errors);
      return;
    }

    const response = await dispatch(AsyncThunks.signUp(formValues));

    if (response.payload?.success) {
      showAlert('success', { message: response.payload.message });
      navigation.navigate('Signin');
    }
  };

  useEffect(() => {
    if (formInteracted) {
      const errors = validateForm(formValues);
      setValidationErrors(errors);
    }
  }, [formInteracted, formValues]);

  useEffect(() => {
    dispatch(accountActions.clearError());
  }, []);

  return (
    <ScreenTemplate>
      <FormTemplate loading={loading} onSubmit={handleSignup} formIsValid={formIsValid}>
        <Text style={styles.head}>Hello, stranger!</Text>
        <Text style={styles.description}>Discover new places and start your next journey</Text>

        <Input
          style={styles.input}
          value={formValues.email}
          maxLength={EMAIL_MAX_LENGTH}
          placeholder="Enter your email"
          onChangeText={(text: string) => handleInputChange('email', text)}
          error={validationErrors.email}
        />
        <Input
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={formValues.password}
          onChangeText={(text: string) => handleInputChange('password', text)}
          error={validationErrors.password}
        />
        <Input
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={formValues.confirm_password}
          onChangeText={(text: string) => handleInputChange('confirm_password', text)}
          error={validationErrors.confirm_password}
        />
        <View style={styles.container}>
          <Text style={styles.toggleText}>Already have an account?</Text>
          <Text
            style={styles.link}
            onPress={() => {
              navigation.navigate('Signin');
            }}
          >
            Sign In
          </Text>
        </View>
      </FormTemplate>
    </ScreenTemplate>
  );
};

export default Signup;
