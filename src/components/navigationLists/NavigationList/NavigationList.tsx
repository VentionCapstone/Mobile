import { SectionList } from 'react-native';
import { useSelector } from 'react-redux';
import Text from 'src/components/Text/Text';
import { getColors } from 'src/store/selectors';
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
  const colors = useSelector(getColors);

  return (
    <SectionList
      scrollEnabled={false}
      sections={originalData}
      contentContainerStyle={[styles.container, { borderBottomColor: colors.border }]}
      alwaysBounceVertical={false}
      keyExtractor={(item, index) => item.label + index}
      renderItem={({ item }) => {
        return <NavigationListItem item={item} />;
      }}
      renderSectionHeader={({ section: { title } }) => {
        if (!title) return null;
        return <Text style={styles.sectionTitle}>{title}</Text>;
      }}
    />
  );
};

export default NavigationList;
