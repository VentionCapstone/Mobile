import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from 'src/navigation';
import { getFilterSettings, getIsDarkMode } from 'src/store/selectors';
import { LEVEL_1 } from 'src/styles';
import { IconName } from 'src/types';

import styles from './ExploreHeader.styles';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import ThemedView from '../ThemedView/ThemedView';
import SearchModal from '../modals/ExploreModals/SearchModal/SearchModal';
import { getStayDuration } from './ExploreHeader.utils';
import { DEFAULT_LOCATION, DEFAULT_DURATION } from 'src/constants/constantLabels';

const ExploreHeader = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const colors = useSelector(getIsDarkMode);
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  const filter = useSelector(getFilterSettings);

  const [locationText, setLocationText] = useState(filter.location ? filter.location : DEFAULT_LOCATION)
  const [durationText, setDurationText] = useState((filter.checkInDate && filter.checkOutDate) ? getStayDuration(filter.checkInDate, filter.checkOutDate) : DEFAULT_DURATION)

  function handleSearchModalChange() {
    setSearchModalVisible(!searchModalVisible);
  }

  useEffect(() => {
    setLocationText(filter.location ? filter.location : DEFAULT_LOCATION);
    setDurationText((filter.checkInDate && filter.checkOutDate) ? getStayDuration(filter.checkInDate, filter.checkOutDate) : DEFAULT_DURATION)
  }, [filter, filter.location, filter.checkInDate, filter.checkOutDate]);

  return (
    <ThemedView>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
          <ThemedView style={[styles.searchBar, LEVEL_1, colors && styles.darkModeShadow]}>
            <Icon name={IconName.Search} size={26} />
            <View style={styles.searchContent}>
              <Text style={styles.searchHeader}>Where to go?</Text>
              <Text>{ locationText} · { durationText}</Text>
            </View>
          </ThemedView>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FilterModal')}>
          <ThemedView style={[styles.filter, colors && styles.darkModeBorder]}>
            <Icon name={IconName.Options} size={26} />
          </ThemedView>
        </TouchableOpacity>
      </SafeAreaView>
      <SearchModal modalOpen={searchModalVisible} changeOpen={handleSearchModalChange} />
    </ThemedView>
  );
};

export default ExploreHeader;
