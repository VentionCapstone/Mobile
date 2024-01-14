import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, ButtonType, NavigationHeader } from 'src/components';
import {
  Account,
  AddAccommodationImage,
  CreateAccommodation,
  CreateProfile,
  ChangeLanguage,
  ChangeTheme,
  MyAccommodations,
  Signin,
  Signup,
  UpdateAccommodation,
  UpdateProfile,
  VerifyEmail,
  NotificationSettings,
  Notifications,
  CreateAmenities,
} from 'src/screens';
import { getIsDarkMode } from 'src/store/selectors';
import { BLACK, BUTTON_SIZES, WHITE } from 'src/styles';

import BottomTabNavigation from './BottomTabNavigator/BottomTabNavigator';
import { RootStackParamList } from './RootStackNavigator.types';

const RootRouterStack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isDark = useSelector(getIsDarkMode);

  useEffect(() => {
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
    StatusBar.setBackgroundColor(isDark ? BLACK : WHITE);
  }, [isDark]);

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
        initialParams={{ email: '' }}
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
        name="ChangeLanguage"
        component={ChangeLanguage}
        options={{ header: () => <NavigationHeader title="Language" /> }}
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
      <RootRouterStack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={{ header: () => <NavigationHeader title="Notification Settings" /> }}
      />
      <RootRouterStack.Screen
        name="Notifications"
        component={Notifications}
        options={{ header: () => <NavigationHeader title="Notifications" /> }}
      />
      <RootRouterStack.Screen
        name="CreateAmenities"
        component={CreateAmenities}
        initialParams={{ isNew: true }}
        options={{ headerShown: false }}
      />
    </RootRouterStack.Navigator>
  );
};

export default RootStackNavigator;
