import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleVerifyEmail = () => {
    setIsVerified(true);
    navigation.navigate('Signin');
  };

  return (
    <ScreenTemplate>
      <View style={{ padding: 20 }}>
        <Input value={email} onChangeText={setEmail} placeholder="Email" />

        {!isVerified && (
          <>
            <Input
              value={verificationCode}
              onChangeText={setVerificationCode}
              placeholder="Verification Code"
            />

            <Button title="Verify Email" onPress={handleVerifyEmail} />
          </>
        )}

        {isVerified && <Text>Email verified successfully!</Text>}
      </View>
    </ScreenTemplate>
  );
};

export default VerifyEmail;
