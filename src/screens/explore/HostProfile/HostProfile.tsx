import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'src/components';
import { RootStackParamList } from 'src/navigation';
type Props = NativeStackScreenProps<RootStackParamList, 'HostProfile'>;

const HostProfile = ({ route, navigation }: Props) => {
  const { hostId } = route.params;
  return (
    <Text>
      Host
      {hostId}
    </Text>
  );
};
export default HostProfile;
