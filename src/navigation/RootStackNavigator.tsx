import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, ButtonType, NavigationHeader } from 'src/components';
import {
  Account,
  ChangeTheme,
  CreateAccommodation,
  CreateProfile,
  MyAccommodations,
  UpdateProfile,
  AddAccommodationImage,
  Signin,
  Signup,
  VerifyEmail,
  UpdateAccommodation,
} from 'src/screens';
import { BUTTON_SIZES } from 'src/styles';

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
        name="Signin"
        component={Signin}
        options={{ header: () => <NavigationHeader title="Sign In" /> }}
      />
      <RootRouterStack.Screen
        name="Signup"
        component={Signup}
        options={{ header: () => <NavigationHeader title="Sign Up" /> }}
      />
      <RootRouterStack.Screen
        name="VerifyEmail"
        component={VerifyEmail}
        initialParams={{ data: { email: '', password: '', confirm_password: '' } }}
        options={{ header: () => <NavigationHeader title="Verification" /> }}
      />
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
                  height={35}
                  size={BUTTON_SIZES.SM}
                  type={ButtonType.SECONDARY}
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
      <RootRouterStack.Screen
        name="UpdateAccommodation"
        component={UpdateAccommodation}
        options={{ header: () => <NavigationHeader title="Edit Accommodation" /> }}
      />
      <RootRouterStack.Screen
        name="AddAccommodationImage"
        component={AddAccommodationImage}
        options={{ header: () => <NavigationHeader /> }}
      />
    </RootRouterStack.Navigator>
  );
};

export default RootStackNavigator;
