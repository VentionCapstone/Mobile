import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Text, Seperator, ButtonType } from 'src/components';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation/RootStackNavigator.types';
import { AppDispatch, RootState } from 'src/store';
import { AsyncThunks } from 'src/store/thunks';

import styles from '../auth.styles';

const Signup = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignup = () => {
    console.log('Signing up...');
    dispatch(AsyncThunks.signUp(credentials));
    console.log('redirecting to verify email');
    navigation.navigate('VerifyEmail');
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials({
      ...credentials,
      [field]: value,
    });
  };

  const isPasswordMatch = credentials.password === credentials.confirmPassword;

  return (
    <ScreenTemplate>
      <FormTemplate loading={loading} onSubmit={handleSignup} error={error}>
        <Text style={styles.head}>Hello, stranger!</Text>
        <Text style={styles.description}>Discover new places and start your next journey</Text>
        <Input
          style={styles.input}
          placeholder="Enter your email"
          value={credentials.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />
        <Input
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={credentials.password}
          onChangeText={(text) => handleInputChange('password', text)}
        />
        <Input
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={credentials.confirmPassword}
          onChangeText={(text) => handleInputChange('confirmPassword', text)}
        />
        {!isPasswordMatch && <Text style={{ color: 'red' }}>Passwords do not match</Text>}
        <Seperator />
        <Text style={styles.toggleText}>Already have an account?</Text>
        <Button
          style={{ marginTop: 10, marginBottom: 10, height: 45 }}
          title="Sign In"
          type={ButtonType.SECONDARY}
          onPress={() => {
            navigation.navigate('Main');
            navigation.navigate('Signin');
          }}
        />
      </FormTemplate>
    </ScreenTemplate>
  );
};

export default Signup;
