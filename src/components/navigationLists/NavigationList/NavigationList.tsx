import { useTranslation } from 'react-i18next';
import { SectionList } from 'react-native';
import { useSelector } from 'react-redux';
import Text from 'src/components/Text/Text';
import { getIsGuestAccount } from 'src/store/selectors';
import { NavigationListOption, NavigationListSection } from 'src/types/navigationList';

import styles from './NavigationList.styles';
import { getSections } from './NavigationList.utils';
import NavigationListItem from '../NavigationListItem/NavigationListItem';

interface Props {
  options?: NavigationListOption[];
  sections?: NavigationListSection[];
}

const NavigationList = ({ options, sections }: Props) => {
  const originalData: NavigationListSection[] = getSections({ options, sections });
  const { t } = useTranslation();
  const isGuestAccount = useSelector(getIsGuestAccount);

  const filteredData = isGuestAccount
    ? originalData.map((item) => ({
        ...item,
        data: item.data.filter((item) => !item.whenAccountCreated),
      }))
    : originalData;

  return (
    <SectionList
      scrollEnabled={false}
      sections={filteredData}
      contentContainerStyle={styles.container}
      alwaysBounceVertical={false}
      keyExtractor={(item, index) => item.label + index}
      renderItem={({ item }) => {
        return <NavigationListItem item={item} />;
      }}
      renderSectionHeader={({ section: { title } }) => {
        if (!title) return null;
        return <Text style={styles.sectionTitle}>{t(title)}</Text>;
      }}
    />
  );
};

export default NavigationList;
