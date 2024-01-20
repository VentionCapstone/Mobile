import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, ButtonType, NavigationHeader } from 'src/components';
import FilterModal from 'src/components/modals/ExploreModals/FilterModal/FilterModal';
import {
  Account,
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
  AccommodationAddress,
  AccommodationInfos,
  AccommodationTitle,
  AccommodationDescription,
  AccommodationPriceAndArea,
  AccommodationDate,
  AccommodationImage,
  CreateAmenities,
} from 'src/screens';
import CardById from 'src/screens/explore/CardById/CardById';
import { getIsDarkMode, getIsGuestAccount } from 'src/store/selectors';
import { BLACK, BUTTON_SIZES, WHITE } from 'src/styles';

import BottomTabNavigation from './BottomTabNavigator/BottomTabNavigator';
import { RootStackParamList } from './RootStackNavigator.types';

const RootRouterStack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isDark = useSelector(getIsDarkMode);
  const isGuestAccount = useSelector(getIsGuestAccount);

  useEffect(() => {
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
    Platform.OS === 'android' && StatusBar.setBackgroundColor(isDark ? BLACK : WHITE);
  }, [isDark]);

  return (
    <RootRouterStack.Navigator>
      <RootRouterStack.Screen
        name="Main"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />

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
                <>
                  {!isGuestAccount && (
                    <Button
                      title="create"
                      height={35}
                      size={BUTTON_SIZES.SM}
                      type={ButtonType.SECONDARY}
                      onPress={() => navigation.navigate('AccommodationAddress')}
                    />
                  )}
                </>
              }
            />
          ),
        }}
      />
      <RootRouterStack.Screen
        name="UpdateAccommodation"
        component={UpdateAccommodation}
        options={{ header: () => <NavigationHeader title="Edit Accommodation" /> }}
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

      <RootRouterStack.Group screenOptions={{ headerShown: false }}>
        <RootRouterStack.Screen name="AccommodationAddress" component={AccommodationAddress} />
        <RootRouterStack.Screen name="AccommodationInfos" component={AccommodationInfos} />
        <RootRouterStack.Screen name="AccommodationTitle" component={AccommodationTitle} />
        <RootRouterStack.Screen name="AccommodationDate" component={AccommodationDate} />
        <RootRouterStack.Screen name="AccommodationImage" component={AccommodationImage} />
        <RootRouterStack.Screen
          name="AccommodationPriceAndArea"
          component={AccommodationPriceAndArea}
        />
        <RootRouterStack.Screen
          name="AccommodationDescription"
          component={AccommodationDescription}
        />
      </RootRouterStack.Group>

      <RootRouterStack.Screen
        name="CreateAmenities"
        component={CreateAmenities}
        initialParams={{ isNew: true }}
        options={{
          header: () => (
            <NavigationHeader
              title="Add Amenities"
              rightComponent={
                <Button
                  title="Close"
                  height={35}
                  size={BUTTON_SIZES.SM}
                  type={ButtonType.PRIMARY}
                  onPress={() => {
                    navigation.navigate('MyAccommodations');
                  }}
                />
              }
            />
          ),
        }}
      />
      <RootRouterStack.Screen
        name="CardById"
        component={CardById}
        options={{ headerShown: false }}
      />
      <RootRouterStack.Screen
        name="FilterModal"
        component={FilterModal}
        options={{ headerShown: false }}
      />
    </RootRouterStack.Navigator>
  );
};

export default RootStackNavigator;
