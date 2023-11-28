import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Booking, Explore, Profile, Wishlist } from 'src/screens';
import { useTheme } from 'src/theme';

import { BottomTabParamList } from './BottomTabNavigator.types';
import { getTabBarIcon, getTabBarStyles } from './BottomTabNavigator.utils';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const { colors } = useTheme();
  const styles = getTabBarStyles(colors);

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => getTabBarIcon(route.name, color),
        ...styles,
      })}
      initialRouteName="Explore"
    >
      <BottomTab.Screen name="Explore" component={Explore} />
      <BottomTab.Screen name="Wishlist" component={Wishlist} />
      <BottomTab.Screen name="Booking" component={Booking} />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
