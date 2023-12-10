import { NavigationListSection } from 'src/types/navigationList';
import { IconName } from 'src/types/ui';

export const ACCOUNT_SECTIONS: NavigationListSection[] = [
  {
    title: 'Settings',
    data: [
      {
        label: 'Account Information',
        iconName: IconName.PersonCircle,
        screen: 'Account',
        loggedInOnly: true,
      },
      {
        label: 'Notifications',
        iconName: IconName.Notifications,
        screen: 'Account',
        loggedInOnly: true,
      },
      {
        label: 'My Accommodations',
        iconName: IconName.Notifications,
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
        screen: 'Account',
        loggedInOnly: false,
      },
    ],
  },
];
