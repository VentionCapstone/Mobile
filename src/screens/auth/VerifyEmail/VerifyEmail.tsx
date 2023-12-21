import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { Props, RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { AsyncThunks } from 'src/store/thunks';

import styles from './VerifyEmail.style';

const VerifyEmail = ({ route }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [optionalMessage, setOptionalMessage] = React.useState('Waiting...');

  const data = route.params?.data;
  const verification = useCallback(async () => {
    const response = await dispatch(AsyncThunks.verifyEmail(data));
    if (response.payload?.status === 200) {
      setOptionalMessage('Link sent to your email adress \nYou can sign in after verification');
      navigation.navigate('Signin');
    } else {
      setOptionalMessage(response.payload?.data.message);
      navigation.navigate('Main');
    }
  }, [optionalMessage]);

  useEffect(() => {
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
