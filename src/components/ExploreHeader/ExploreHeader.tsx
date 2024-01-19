import React, { useState } from 'react';
import { View, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { getIsDarkMode } from 'src/store/selectors';
import { BLACK, LEVEL_1, WHITE } from 'src/styles';
import { IconName } from 'src/types';

import styles from './ExploreHeader.styles';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import ThemedView from '../ThemedView/ThemedView';
import { FilterModal, SearchModal } from '../modals/ExploreModals';

const ExploreHeader = () => {
  const colors = useSelector(getIsDarkMode);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  function handleSearchModalChange() {
    setSearchModalVisible(!searchModalVisible);
  }

  function handleFilterModalChange() {
    setFilterModalVisible(!filterModalVisible);
  }

  return (
    <ThemedView>
      <StatusBar backgroundColor={colors ? BLACK : WHITE} />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
          <ThemedView style={[styles.searchBar, LEVEL_1, colors && styles.darkModeShadow]}>
            <Icon name={IconName.Search} size={26} />
            <View style={styles.searchContent}>
              <Text style={styles.searchHeader}>Where to go?</Text>
              <Text>anywhere · week · 1 person</Text>
            </View>
          </ThemedView>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <ThemedView style={[styles.filter, colors && styles.darkModeBorder]}>
            <Icon name={IconName.Options} size={26} />
          </ThemedView>
        </TouchableOpacity>
      </SafeAreaView>
      <SearchModal modalOpen={searchModalVisible} changeOpen={handleSearchModalChange} />
      <FilterModal modalOpen={filterModalVisible} changeOpen={handleFilterModalChange} />
    </ThemedView>
  );
};

export default ExploreHeader;
