import { AntDesign } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { Icon } from 'src/components';
import { ThemeColors } from 'src/types';
import { IconName } from 'src/types/ui';

type GetTabBarIconProps = {
  route: {
    name: string;
  };
  color: string;
  focused: boolean;
};

export const getTabBarIcon = ({ route, color, focused }: GetTabBarIconProps) => {
  switch (route.name) {
    case 'Explore':
      return (
        <Icon name={focused ? IconName.Search : IconName.SearchOutline} size={26} color={color} />
      );
    case 'Wishlist':
      return (
        <Icon name={focused ? IconName.Heart : IconName.HeartOutline} size={24} color={color} />
      );
    case 'Booking':
      return <AntDesign name="book" size={22} color={color} />;
    case 'Profile':
      return <Icon name={IconName.PersonCircleOutline} size={24} color={color} />;
    case 'Login':
      return <Icon name={IconName.Login} size={28} color={color} />;
    default:
      return <Icon name={IconName.Add} size={26} color={color} />;
  }
};

type GetTabBarStylesProps = {
  colors: ThemeColors;
  isDarkMode: boolean;
};

export const getTabBarStyles = ({ colors, isDarkMode }: GetTabBarStylesProps) => ({
  tabBarStyle: {
    height: Platform.OS === 'ios' ? 85 : 60,
    backgroundColor: colors.background,
    borderTopWidth: isDarkMode ? 1 : 0,
    borderTopColor: isDarkMode ? colors.border : 'transparent',
    paddingTop: 8,
  },
  tabBarLabelStyle: {
    fontSize: 11,
    paddingBottom: 10,
    fontWeight: '400',
  },
  tabBarInactiveTintColor: colors.icon,
  tabBarActiveTintColor: colors.tint,
});
