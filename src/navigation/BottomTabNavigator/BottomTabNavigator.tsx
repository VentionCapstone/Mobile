import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { ExploreHeader } from 'src/components';
import BottomTabsHeader from 'src/components/BottomTabsHeader/BottomTabsHeader';
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
          header: () => <ExploreHeader />,
        }}
      />
      <BottomTab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          header: () => <BottomTabsHeader title="Wishlist" />,
        }}
      />
      <BottomTab.Screen
        name="Booking"
        component={Booking}
        options={{
          header: () => <BottomTabsHeader title="Booking" />,
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
