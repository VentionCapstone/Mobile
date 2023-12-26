import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { AsyncThunks } from 'src/store/thunks';
import { AuthParams } from 'src/types';

import styles from './VerifyEmail.style';

type VerifyEmailNavigationProp = StackNavigationProp<RootStackParamList, 'VerifyEmail'>;
type VerifyEmailRouteProp = RouteProp<RootStackParamList, 'VerifyEmail'>;

interface VerifyEmailProps {
  navigation: VerifyEmailNavigationProp;
  route: VerifyEmailRouteProp;
}

const message = {
  success: 'Verification successful',
  failed: 'Verification failed. \nTry again later',
  pending: 'Waiting...',
};

const VerifyEmail = ({ route }: VerifyEmailProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [verificationMessage, setVerificationMessage] = useState<string>(message.pending);

  const verification = useCallback(async () => {
    const response = await dispatch(AsyncThunks.verifyEmail(route.params as AuthParams));
    switch (response.payload?.success) {
      case true:
        setVerificationMessage(message.success);
        navigation.navigate('Signin');
        break;
      case false:
        setVerificationMessage(message.failed);
        navigation.navigate('Main');
        break;
      default:
        setVerificationMessage(message.pending);
    }
  }, [dispatch, navigation, route.params]);

  useEffect(() => {
    verification();
  });

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.text}>{verificationMessage}</Text>
      </View>
    </ScreenTemplate>
  );
};

export default VerifyEmail;
