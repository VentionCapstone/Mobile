import { RootStackParamList } from 'src/navigation';

import { IconName } from './ui';

export type NavigationListOption = {
  label: string;
  iconName: IconName;
  screen?: keyof RootStackParamList;
  onPress?: () => void;
  showIconRight?: boolean;
  whenAccountCreated?: boolean;
};

export type NavigationListSection = {
  title?: string;
  data: NavigationListOption[];
};
