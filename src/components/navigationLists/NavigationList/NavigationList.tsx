import React from 'react';
import { SectionList } from 'react-native';
import { useSelector } from 'react-redux';
import Seperator from 'src/components/Seperator/Seperator';
import Text from 'src/components/Text/Text';
import { getIsLoggedIn } from 'src/store/selectors';
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
  const isLoggedIn = useSelector(getIsLoggedIn);

  const filteredData = originalData.map((section) => ({
    ...section,
    data: section.data.filter((item) => !item.loggedInOnly || isLoggedIn),
  }));

  return (
    <SectionList
      scrollEnabled={false}
      sections={filteredData}
      contentContainerStyle={styles.container}
      alwaysBounceVertical={false}
      keyExtractor={(item, index) => item.label + index}
      ItemSeparatorComponent={() => <Seperator />}
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
