import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { AsyncThunks } from 'src/store/thunks';

import styles from './VerifyEmail.style';

const VerifyEmail = ({ route }: any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [optionalMessage, setOptionalMessage] = React.useState('Waiting...');

  const verification = async () => {
    const response = await dispatch(AsyncThunks.signUp(route.params));
    if (response.payload?.status === 200) {
      setOptionalMessage('Link sent to your email adress \nYou can sign in after verification');
      setTimeout(() => {
        navigation.navigate('Signin');
      }, 5000);
    }
    if (response.payload?.status === 400) {
      setOptionalMessage('Email already exists');
      setTimeout(() => {
        navigation.navigate('Main');
      }, 5000);
    }
    if (response.payload?.status === 409) {
      setOptionalMessage('Email already in use');
      setTimeout(() => {
        navigation.navigate('Main');
      }, 5000);
    }

    setTimeout(() => {
      navigation.navigate('Main');
    }, 10000);
  };

  useEffect(() => {
    console.log(route.params);
    verification();
  }, []);

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.text}>{optionalMessage}</Text>
      </View>
    </ScreenTemplate>
  );
};

export default VerifyEmail;
