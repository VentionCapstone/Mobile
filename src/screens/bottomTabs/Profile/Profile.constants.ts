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
        loggedInOnly: true,
      },
      {
        label: 'Notifications',
        iconName: IconName.Notifications,
        screen: 'Notifications',
        loggedInOnly: true,
      },
      {
        label: 'My Accommodations',
        iconName: IconName.List,
        screen: 'MyAccommodations',
        loggedInOnly: true,
      },
      {
        label: 'Theme',
        iconName: IconName.ThemeSun,
        screen: 'ChangeTheme',
        loggedInOnly: false,
      },
      {
        label: 'Language',
        iconName: IconName.Language,
        screen: 'ChangeLanguage',
        loggedInOnly: false,
      },
    ],
  },
];
