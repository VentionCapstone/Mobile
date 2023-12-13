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

const Signin = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const loading = useSelector(getAuthLoading);
  const error = useSelector(getAuthError);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSignin = async () => {
    await dispatch(AsyncThunks.signIn(credentials));
    console.log(loading);
    console.log(error);
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
