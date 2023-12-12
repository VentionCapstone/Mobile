import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Text, Seperator } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation/RootStackNavigator.types';
import { RootState } from 'src/store';
import { AsyncThunks } from 'src/store/thunks';

const Signin = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = () => {
    console.log('Signing in...');
    dispatch(AsyncThunks.signIn({ email, password }));
  };

  return (
    <ScreenTemplate>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 30, marginTop: 20 }}>Welcome back!</Text>
        <Input
          style={{ marginTop: 30, height: 60 }}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={{ marginBottom: 10, height: 60 }}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button
          style={{ marginTop: 10, marginBottom: 10, height: 60 }}
          title={loading === 'pending' ? <ActivityIndicator /> : 'Sign In'}
          onPress={handleSignin}
        />
        <Seperator />
        <Text style={{ marginTop: 20 }}>Don't have an account yet?</Text>
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <Button
          style={{ marginTop: 10, marginBottom: 10, height: 60 }}
          type="secondary"
          title="Sign Up"
          onPress={() => {
            navigation.navigate('Signup');
          }}
        />
      </View>
    </ScreenTemplate>
  );
};

export default Signin;
