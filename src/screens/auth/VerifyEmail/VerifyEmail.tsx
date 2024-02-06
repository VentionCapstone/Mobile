import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, View } from 'react-native';
import { Icon, Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { TOMATO_100 } from 'src/styles';
import { IconName } from 'src/types';

import { styles } from './VerifyEmail.style';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifyEmail'>;

const VerifyEmail = ({ navigation }: Props) => {
  return (
    <ScreenTemplate style={styles.container}>
      <Icon name={IconName.Check} size={100} color={TOMATO_100} />
      <Text style={styles.title}>Check your email</Text>
      <Text style={{ textAlign: 'center' }}>
        We've just sent a verification email to your inbox
      </Text>

      <View style={styles.redirectToLogin}>
        <Pressable onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.redirectToLoginText}>Return to Sign in</Text>
        </Pressable>
      </View>
    </ScreenTemplate>
  );
};

export default VerifyEmail;
