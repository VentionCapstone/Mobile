import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Input, Text } from 'src/components';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation/RootStackNavigator.types';
import { useAppDispatch } from 'src/store';
import { getAccountError, getAccountLoader } from 'src/store/selectors';
import { accountActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { EMAIL_MAX_LENGTH } from 'src/utils';

import { validateForm } from './Signup.utils';
import styles from '../auth.styles';

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const loading = useSelector(getAccountLoader);
  const authError = useSelector(getAccountError);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [formValues, setFormValues] = useState({
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

    if (Object.keys(errors).length === 0) {
      dispatch(accountActions.clearError());
      const response = await dispatch(AsyncThunks.signUp(formValues));

      if (response.payload?.success) {
        navigation.navigate('VerifyEmail');
      }
    } else {
      setValidationErrors(errors);
    }
  };

  useEffect(() => {
    if (formInteracted) {
      const errors = validateForm(formValues);
      setValidationErrors(errors);
    }
  }, [formValues]);

  useEffect(() => {
    dispatch(accountActions.clearError());
  }, []);

  return (
    <ScreenTemplate>
      <FormTemplate
        loading={loading}
        onSubmit={handleSignup}
        error={authError}
        formIsValid={formIsValid}
      >
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
