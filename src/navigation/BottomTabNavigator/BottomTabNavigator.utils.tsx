import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'src/components';
import { ThemeColors } from 'src/types';
import { IconName } from 'src/types/ui';

export const getTabBarIcon = (routeName: string, color: string): React.JSX.Element => {
  switch (routeName) {
    case 'Explore':
      return <Icon name={IconName.Search} size={26} color={color} />;
    case 'Wishlist':
      return <Icon name={IconName.Heart} size={26} color={color} />;
    case 'Booking':
      return <AntDesign name="book" size={24} color={color} />;
    case 'Profile':
      return <Icon name={IconName.PersonCircle} size={26} color={color} />;
    default:
      return <Icon name={IconName.Add} size={26} color={color} />;
  }
};

export const getTabBarStyles = (colors: ThemeColors) => ({
  tabBarStyle: {
    height: Platform.OS === 'ios' ? 90 : 60,
    paddingBottom: 8,
    paddingTop: 6,
    backgroundColor: colors.background,
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
  tabBarInactiveTintColor: colors.icon,
  tabBarActiveTintColor: colors.tint,
});
