import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Input, Text } from 'src/components';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation/RootStackNavigator.types';
import { useAppDispatch } from 'src/store';
import { getAccountError, getAccountLoader, getResult } from 'src/store/selectors';
import { accountActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';

import { validateForm } from './Signup.utils';
import styles from '../auth.styles';

const Signup = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();
  const loading = useSelector(getAccountLoader);
  const authError = useSelector(getAccountError);
  const authResult = useSelector(getResult);

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirm_password: '',
  });

  const formIsValid = Object.keys(validationErrors).length === 0;

  const handleSignup = async () => {
    if (formIsValid) {
      await dispatch(AsyncThunks.signUp(credentials));
      if (authResult) {
        dispatch(accountActions.clearError());
        navigation.navigate('VerifyEmail');
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials({
      ...credentials,
      [field]: value,
    });
  };

  useEffect(() => {
    const errors = validateForm(credentials);
    setValidationErrors(errors);
  }, [credentials]);

  useEffect(() => {
    dispatch(accountActions.clearError());
  }, []);

  return (
    <ScreenTemplate>
      <FormTemplate
        loading={loading}
        onSubmit={handleSignup}
        error={formIsValid ? authError : null}
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
