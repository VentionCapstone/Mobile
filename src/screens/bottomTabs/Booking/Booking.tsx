import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';

const Booking = () => {
  const nav = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <ScreenTemplate>
      <Text>BookingScreen</Text>
      <Button onPress={() => nav.navigate('CreateAmenities')} title="CreateAmenities" />
    </ScreenTemplate>
  );
};

export default Booking;
