import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Input, Text, Seperator } from 'src/components';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation/RootStackNavigator.types';
import { useAppDispatch } from 'src/store';
import { getAccountError, getAccountLoader, getResult } from 'src/store/selectors';
import { accountActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';

import styles from '../auth.styles';

const Signin = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const loading = useSelector(getAccountLoader);
  const authError = useSelector(getAccountError);
  const authResult = useSelector(getResult);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setCredentials({
      ...credentials,
      [field]: value,
    });
  };

  const handleSignin = async () => {
    await dispatch(AsyncThunks.signIn(credentials));
    if (authResult) {
      dispatch(accountActions.clearError());
      navigation.navigate('Main');
    }
  };

  useEffect(() => {
    dispatch(accountActions.clearError());
  }, []);

  return (
    <ScreenTemplate>
      <FormTemplate loading={loading} onSubmit={handleSignin} error={authError}>
        <Text style={styles.head}>Welcome back!</Text>
        <Text style={styles.description}>
          Sign in to your account and plan your next journey with us
        </Text>
        <Input
          style={styles.input}
          value={credentials.email}
          onChangeText={(text) => handleInputChange('email', text)}
          placeholder="Enter your email"
        />
        <Input
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={credentials.password}
          onChangeText={(text) => handleInputChange('password', text)}
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
