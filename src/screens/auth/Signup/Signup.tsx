import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Input, Text, Seperator } from 'src/components';
import { FormTemplate, ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation/RootStackNavigator.types';
import { useAppDispatch } from 'src/store';
import { getAuthError, getAuthLoading } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';

import styles from '../auth.styles';

const Signup = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();
  const loading = useSelector(getAuthLoading);
  const error = useSelector(getAuthError);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirm_password: '',
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

  const isPasswordMatch = credentials.password === credentials.confirm_password;

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
          value={credentials.confirm_password}
          onChangeText={(text) => handleInputChange('confirmPassword', text)}
        />
        {!isPasswordMatch && <Text style={{ color: 'red' }}>Passwords do not match</Text>}
        <Seperator />
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
