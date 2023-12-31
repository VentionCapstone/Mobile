import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { NavigationHeader } from 'src/components';
import { Booking, Explore, Profile, Wishlist } from 'src/screens';
import { getColors } from 'src/store/selectors';

import { BottomTabParamList } from './BottomTabNavigator.types';
import { getTabBarIcon, getTabBarStyles } from './BottomTabNavigator.utils';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const colors = useSelector(getColors);
  const styles = getTabBarStyles(colors);

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => getTabBarIcon(route.name, color),
        ...styles,
      })}
      initialRouteName="Explore"
    >
      <BottomTab.Screen
        name="Explore"
        component={Explore}
        options={{
          header: () => <NavigationHeader title="Explore" leftComponent={false} />,
        }}
      />
      <BottomTab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          header: () => <NavigationHeader title="Wishlist" leftComponent={false} />,
        }}
      />
      <BottomTab.Screen
        name="Booking"
        component={Booking}
        options={{
          header: () => <NavigationHeader title="Booking" leftComponent={false} />,
        }}
      />
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
