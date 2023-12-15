import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Input, Text, Seperator } from 'src/components';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation/RootStackNavigator.types';
import { useAppDispatch } from 'src/store';
import { getAuthError, getAuthLoading } from 'src/store/selectors';
import { authActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';

import { validateForm } from './Signin.utils';
import styles from '../auth.styles';

const Signin = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const loading = useSelector(getAuthLoading);
  const authError = useSelector(getAuthError);

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formInteracted, setFormInteracted] = useState<boolean>(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const formIsValid = Object.keys(validationErrors).length === 0;

  const handleSignin = async () => {
    setFormInteracted(true);
    if (formIsValid) {
      console.log('Signing in...');
      await dispatch(AsyncThunks.signIn(credentials));
    }
  };

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
        onSubmit={handleSignin}
        error={formInteracted && formIsValid ? authError : null}
        formIsValid={formIsValid}
      >
        <Text style={styles.head}>Welcome back!</Text>
        <Text style={styles.description}>
          Sign in to your account and plan your next journey with us
        </Text>
        <Input
          style={styles.input}
          value={credentials.email}
          onChangeText={(text) => setCredentials({ ...credentials, email: text })}
          placeholder="Enter your email"
          error={validationErrors.email}
        />
        <Input
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={credentials.password}
          onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        />
        <Seperator />
        <View style={styles.container}>
          <Text style={styles.toggleText}>Don't have an account yet?</Text>
          <Text
            style={styles.link}
            onPress={() => {
              navigation.navigate('Signup');
            }}
          >
            Sign Up
          </Text>
        </View>
      </FormTemplate>
    </ScreenTemplate>
  );
};

export default Signin;
