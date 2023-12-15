import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';

const VerifyEmail = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useEffect(() => {
    console.log('Link sent');
  }, []);

  return (
    <ScreenTemplate>
      <View>
        <Text>Validation placeholder</Text>
      </View>
    </ScreenTemplate>
  );
};

export default VerifyEmail;
