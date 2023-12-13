import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Text, Seperator, ButtonType } from 'src/components';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation/RootStackNavigator.types';
import { AppDispatch, RootState } from 'src/store';
import { setError } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';

import styles from '../auth.styles';

const Signin = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSignin = () => {
    if (credentials.email || credentials.password) {
      console.log('Signing in...');
      dispatch(AsyncThunks.signIn(credentials));
    } else {
      setError({ message: 'Please enter your email and password' });
    }
  };

  return (
    <ScreenTemplate>
      <FormTemplate loading={loading} onSubmit={handleSignin} error={error}>
        <Text style={styles.head}>Welcome back!</Text>
        <Text style={styles.description}>
          Sign in to your account and plan your next journey with us
        </Text>
        <Input
          style={styles.input}
          value={credentials.email}
          onChangeText={(text) => setCredentials({ ...credentials, email: text })}
          placeholder="Enter your email"
        />
        <Input
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={credentials.password}
          onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        />
        <Seperator />
        <Text style={styles.toggleText}>Don't have an account yet?</Text>
        <Button
          style={{ marginTop: 10, marginBottom: 10, height: 45 }}
          type={ButtonType.SECONDARY}
          title="Sign Up"
          onPress={() => {
            navigation.navigate('Signup');
          }}
        />
      </FormTemplate>
    </ScreenTemplate>
  );
};

export default Signin;
