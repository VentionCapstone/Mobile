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
        whenAccountCreated: false,
      },
      {
        label: 'Notifications',
        iconName: IconName.Notifications,
        screen: 'NotificationSettings',
        whenAccountCreated: false,
      },
      {
        label: 'My Accommodations',
        iconName: IconName.List,
        screen: 'MyAccommodations',
        whenAccountCreated: false,
      },
      {
        label: 'Theme',
        iconName: IconName.ThemeSun,
        screen: 'ChangeTheme',
        whenAccountCreated: true,
      },
      {
        label: 'Language',
        iconName: IconName.Language,
        screen: 'ChangeLanguage',
        whenAccountCreated: true,
      },
    ],
  },
];

export const AIR_BNB_IMAGE_URL =
  'https://cdni.iconscout.com/illustration/premium/thumb/house-2557338-2140044.png?f=webp';
