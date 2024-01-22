import { NavigationListSection } from 'src/types/navigationList';
import { IconName } from 'src/types/ui';

export const ACCOUNT_SECTIONS: NavigationListSection[] = [
  {
    title: 'Settings',
    data: [
      {
        label: 'Account Information',
        iconName: IconName.PersonCircleOutline,
        screen: 'Account',
      },
      {
        label: 'Notifications',
        iconName: IconName.Notifications,
        screen: 'NotificationSettings',
      },
      {
        label: 'My Accommodations',
        iconName: IconName.List,
        screen: 'MyAccommodations',
      },
      {
        label: 'Theme',
        iconName: IconName.ThemeSun,
        screen: 'ChangeTheme',
      },
      {
        label: 'Language',
        iconName: IconName.Language,
        screen: 'ChangeLanguage',
      },
    ],
  },
];

export const AIR_BNB_IMAGE_URL =
  'https://cdni.iconscout.com/illustration/premium/thumb/house-2557338-2140044.png?f=webp';
