import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';

import styles from './VerifyEmail.style';

const VerifyEmail = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    console.log('Link sent');
  }, []);

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.text}>Link sent to your email</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>You can </Text>
        <Text style={styles.text} onPress={() => navigation.navigate('Signin')}>
          sign in
        </Text>
        <Text style={styles.text}> after verification</Text>
      </View>
    </ScreenTemplate>
  );
};

export default VerifyEmail;
