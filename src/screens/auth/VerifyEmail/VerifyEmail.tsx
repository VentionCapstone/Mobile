import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { AsyncThunks } from 'src/store/thunks';

import styles from './VerifyEmail.style';

type VerifyEmailNavigationProp = StackNavigationProp<RootStackParamList, 'VerifyEmail'>;
type VerifyEmailRouteProp = RouteProp<RootStackParamList, 'VerifyEmail'>;

interface VerifyEmailProps {
  navigation: VerifyEmailNavigationProp;
  route: VerifyEmailRouteProp;
}

const messages = {
  success: 'Verification successful',
  failed: 'Verification failed. \nTry again later',
  pending: 'Waiting...',
};

const VerifyEmail = ({ route }: VerifyEmailProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [verificationMessage, setVerificationMessage] = useState<string>(messages.pending);

  const verification = useCallback(async () => {
    const response = await dispatch(AsyncThunks.verifyEmail(route.params));
    if (response.payload?.success) {
      setVerificationMessage(messages.success);
      navigation.navigate('Signin');
    } else {
      setVerificationMessage(messages.failed);
      navigation.navigate('Main');
    }
  }, [dispatch, navigation, route.params]);

  useEffect(() => {
    verification();
  }, []);

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.text}>{verificationMessage}</Text>
      </View>
    </ScreenTemplate>
  );
};

export default VerifyEmail;
