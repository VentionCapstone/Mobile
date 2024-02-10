import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBar, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, ButtonType, NavigationHeader } from 'src/components';
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
  ProfileImage,
  VerifyEmail,
} from 'src/screens';
import { AccommodationDetails, HostProfile } from 'src/screens/explore';
import { getIsDarkMode, getIsGuestAccount } from 'src/store/selectors';
import { BUTTON_SIZES, GREY_500, WHITE } from 'src/styles';

import BottomTabNavigation from './BottomTabNavigator/BottomTabNavigator';
import { RootStackParamList } from './RootStackNavigator.types';

const RootRouterStack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isDark = useSelector(getIsDarkMode);
  const isGuestAccount = useSelector(getIsGuestAccount);
  const { t } = useTranslation();

  useEffect(() => {
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
    if (Platform.OS === 'android') StatusBar.setBackgroundColor(isDark ? GREY_500 : WHITE);
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
        options={{ header: () => <NavigationHeader title={t('Sign In')} /> }}
      />
      <RootRouterStack.Screen
        name="Signup"
        component={Signup}
        options={{ header: () => <NavigationHeader title={t('Sign Up')} /> }}
      />
      <RootRouterStack.Screen
        name="VerifyEmail"
        component={VerifyEmail}
        options={{ header: () => <NavigationHeader title={t('Verify Email')} /> }}
      />
      <RootRouterStack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{ header: () => <NavigationHeader title={t('Edit Profile')} /> }}
      />
      <RootRouterStack.Screen
        name="CreateProfile"
        component={CreateProfile}
        options={{ header: () => <NavigationHeader title={t('Create Profile')} /> }}
      />
      <RootRouterStack.Screen
        name="ProfileImage"
        component={ProfileImage}
        options={{ header: () => <NavigationHeader title={t('Create Profile')} /> }}
      />
      <RootRouterStack.Screen
        name="Account"
        component={Account}
        options={{ header: () => <NavigationHeader title={t('Account Information')} /> }}
      />
      <RootRouterStack.Screen
        name="ChangeTheme"
        component={ChangeTheme}
        options={{ header: () => <NavigationHeader title={t('Theme')} /> }}
      />
      <RootRouterStack.Screen
        name="ChangeLanguage"
        component={ChangeLanguage}
        options={{ header: () => <NavigationHeader title={t('Language')} /> }}
      />
      <RootRouterStack.Screen
        name="MyAccommodations"
        component={MyAccommodations}
        options={{
          header: () => (
            <NavigationHeader
              title={t('My Accommodations')}
              rightComponent={
                <>
                  {!isGuestAccount && (
                    <Button
                      title={t('create')}
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
        options={{ header: () => <NavigationHeader title={t('Edit Accommodation')} /> }}
      />
      <RootRouterStack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={{ header: () => <NavigationHeader title={t('Notification Settings')} /> }}
      />
      <RootRouterStack.Screen
        name="Notifications"
        component={Notifications}
        options={{ header: () => <NavigationHeader title={t('Notifications')} /> }}
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
              title={t('Add Amenities')}
              rightComponent={
                <Button
                  title={t('Close')}
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
        name="AccommodationDetails"
        component={AccommodationDetails}
        options={{ headerShown: false }}
      />
      <RootRouterStack.Screen
        name="HostProfile"
        component={HostProfile}
        options={{ headerShown: false }}
      />
    </RootRouterStack.Navigator>
  );
};

export default RootStackNavigator;
