import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';

const Explore = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <ScreenTemplate>
      <Text>Explore Screen</Text>
      <Button
        style={{ margin: 30 }}
        onPress={() => navigation.navigate('CreateAmenities')}
        title="Add Amenities"
      />
    </ScreenTemplate>
  );
};

export default Explore;
