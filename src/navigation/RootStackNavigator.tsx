import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, NavigationHeader } from 'src/components';
import {
  Account,
  ChangeTheme,
  CreateAccommodation,
  CreateProfile,
  MyAccommodations,
  UpdateProfile,
} from 'src/screens';
import { BUTTON_SIZES } from 'src/styles';
import { ButtonType } from 'src/types';

import BottomTabNavigation from './BottomTabNavigator/BottomTabNavigator';
import { RootStackParamList } from './RootStackNavigator.types';

const RootRouterStack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <RootRouterStack.Navigator>
      <RootRouterStack.Group screenOptions={{ headerShown: false }}>
        <RootRouterStack.Screen name="Main" component={BottomTabNavigation} />
      </RootRouterStack.Group>

      <RootRouterStack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{ header: () => <NavigationHeader /> }}
      />
      <RootRouterStack.Screen
        name="CreateProfile"
        component={CreateProfile}
        options={{ header: () => <NavigationHeader /> }}
      />
      <RootRouterStack.Screen
        name="Account"
        component={Account}
        options={{ header: () => <NavigationHeader title="Account Information" /> }}
      />
      <RootRouterStack.Screen
        name="ChangeTheme"
        component={ChangeTheme}
        options={{ header: () => <NavigationHeader title="Theme" /> }}
      />
      <RootRouterStack.Screen
        name="MyAccommodations"
        component={MyAccommodations}
        options={{
          header: () => (
            <NavigationHeader
              title="My Accommodations"
              rightComponent={
                <Button
                  title="create"
                  size={BUTTON_SIZES.SM}
                  type={ButtonType.Secondary}
                  onPress={() => navigation.navigate('CreateAccommodation')}
                />
              }
            />
          ),
        }}
      />
      <RootRouterStack.Screen
        name="CreateAccommodation"
        component={CreateAccommodation}
        options={{ header: () => <NavigationHeader title="Create Accommodation" /> }}
      />
    </RootRouterStack.Navigator>
  );
};

export default RootStackNavigator;
