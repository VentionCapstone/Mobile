import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Input, Text } from 'src/components';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation/RootStackNavigator.types';
import { useAppDispatch } from 'src/store';
import { getAuthError, getAuthLoading } from 'src/store/selectors';
import { authActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';

import { validateForm } from './Signup.utils';
import styles from '../auth.styles';

const Signup = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();
  const loading = useSelector(getAuthLoading);
  const authError = useSelector(getAuthError);

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formInteracted, setFormInteracted] = useState<boolean>(false);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirm_password: '',
  });

  const formIsValid = Object.keys(validationErrors).length === 0;

  const handleSignup = () => {
    setFormInteracted(true);
    if (formIsValid) {
      console.log('Signing up...');
      dispatch(AsyncThunks.signUp(credentials));
      console.log('redirecting to verify email');
      navigation.navigate('VerifyEmail');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials({
      ...credentials,
      [field]: value,
    });
  };

  const isPasswordMatch = credentials.password === credentials.confirm_password;

  useEffect(() => {
    if (formInteracted) {
      const errors = validateForm(credentials);
      setValidationErrors(errors);
    }
  }, [credentials, formInteracted]);

  useEffect(() => {
    dispatch(authActions.clearError());
  }, []);

  return (
    <ScreenTemplate>
      <FormTemplate
        loading={loading}
        onSubmit={handleSignup}
        error={formInteracted && formIsValid ? authError : null}
        formIsValid={formIsValid}
      >
        <Text style={styles.head}>Hello, stranger!</Text>
        <Text style={styles.description}>Discover new places and start your next journey</Text>
        <Input
          style={styles.input}
          placeholder="Enter your email"
          value={credentials.email}
          onChangeText={(text) => handleInputChange('email', text)}
          error={validationErrors.email}
        />
        <Input
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={credentials.password}
          onChangeText={(text) => handleInputChange('password', text)}
          error={validationErrors.password}
        />
        <Input
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={credentials.confirm_password}
          onChangeText={(text) => handleInputChange('confirm_password', text)}
          error={validationErrors.confirm_password}
        />
        {!isPasswordMatch && <Text style={{ color: 'red' }}>Passwords do not match</Text>}
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
