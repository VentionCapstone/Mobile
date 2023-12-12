import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Text, Seperator } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation/RootStackNavigator.types';
import { RootState } from 'src/store';
import { AsyncThunks } from 'src/store/thunks';

const Signup = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    console.log('Signing up...');
    dispatch(AsyncThunks.signUp(email, password, confirmPassword));
    //navigation.navigate('verifyEmail');
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
  };

  const isPasswordMatch = password === confirmPassword;

  return (
    <ScreenTemplate>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 30, marginTop: 20 }}>Hello, stranger!</Text>
        <Input
          style={{ marginTop: 30, height: 60 }}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={{ height: 60 }}
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Input
          style={{ height: 60, marginBottom: 20 }}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        {!isPasswordMatch && <Text>Passwords do not match</Text>}
        <Button
          style={{ marginTop: 10, marginBottom: 10, height: 60 }}
          title={loading === 'pending' ? <ActivityIndicator /> : 'Sign Up'}
          onPress={handleSignup}
        />
        <Seperator />
        <Text style={{ marginTop: 20 }}>Already have an account?</Text>
        <Button
          style={{ marginTop: 10, marginBottom: 10, height: 60 }}
          title="Sign In"
          type="secondary"
          onPress={() => {
            navigation.navigate('Main');
            navigation.navigate('Signin');
          }}
        />
      </View>
    </ScreenTemplate>
  );
};

export default Signup;
