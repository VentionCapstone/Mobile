import React from 'react';
import { SectionList } from 'react-native';
import Seperator from 'src/components/Seperator/Seperator';
import Text from 'src/components/Text/Text';
import { NavigationListOption, NavigationListSection } from 'src/types/navigationList';

import styles from './NavigationList.styles';
import { getSections } from './NavigationList.utils';
import NavigationListItem from '../NavigationListItem/NavigationListItem';

interface Props {
  options?: NavigationListOption[];
  sections?: NavigationListSection[];
}

const NavigationList = ({ options, sections }: Props) => {
  const data: NavigationListSection[] = getSections({ options, sections });

  return (
    <SectionList
      keyExtractor={(item, index) => item.label + index}
      style={styles.container}
      ItemSeparatorComponent={() => <Seperator />}
      sections={data}
      scrollEnabled={false}
      alwaysBounceVertical={false}
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
