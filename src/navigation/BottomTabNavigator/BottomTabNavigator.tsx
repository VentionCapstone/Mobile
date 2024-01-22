import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { NavigationHeader } from 'src/components';
import { Booking, Explore, Profile, Wishlist } from 'src/screens';
import { getColors, getIsDarkMode, getIsLoggedIn } from 'src/store/selectors';

import { BottomTabParamList } from './BottomTabNavigator.types';
import { getTabBarIcon, getTabBarStyles } from './BottomTabNavigator.utils';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const colors = useSelector(getColors);
  const isDarkMode = useSelector(getIsDarkMode);
  const styles = getTabBarStyles({ colors, isDarkMode });

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => getTabBarIcon({ route, color, focused }),
        ...styles,
        tabBarLabel: '',
      })}
      initialRouteName="Explore"
    >
      <BottomTab.Screen
        name="Explore"
        component={Explore}
        options={{
          header: () => <NavigationHeader title="Explore" showBackButton={false} />,
        }}
      />
      <BottomTab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          header: () => <NavigationHeader title="Wishlist" showBackButton={false} />,
        }}
      />
      <BottomTab.Screen
        name="Booking"
        component={Booking}
        options={{
          header: () => <NavigationHeader title="Booking" showBackButton={false} />,
        }}
      />
      <BottomTab.Screen
        name={isLoggedIn ? 'Profile' : 'Login'}
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
