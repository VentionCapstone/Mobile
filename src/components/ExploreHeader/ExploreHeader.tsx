import React, { useState } from 'react';
import { View, StatusBar, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { getIsDarkMode } from 'src/store/selectors';
import { BLACK, BUTTON_SIZES, WHITE } from 'src/styles';
import { IconName } from 'src/types';

import styles from './ExploreHeader.styles';
import { Button } from '../Button';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import ThemedView from '../ThemedView/ThemedView';
import ModalContainer from '../modals/ModalContainer/ModalContainer';

const ExploreHeader = () => {
  const colors = useSelector(getIsDarkMode);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  return (
    <ThemedView>
      <StatusBar backgroundColor={colors ? BLACK : WHITE} />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
          <ThemedView style={colors ? [styles.searchBar, styles.darkModeShadow] : styles.searchBar}>
            <Icon name={IconName.Search} size={26} />
            <View style={styles.searchContent}>
              <Text style={styles.searchHeader}>Where to go?</Text>
              <Text>anywhere · week · 1 person</Text>
            </View>
          </ThemedView>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <ThemedView style={colors ? [styles.filter, styles.darkModeBorder] : styles.filter}>
            <Icon name={IconName.Options} size={26} />
          </ThemedView>
        </TouchableOpacity>
      </SafeAreaView>
      <Modal
        animationType="fade"
        visible={searchModalVisible}
        transparent
        onRequestClose={() => {
          setSearchModalVisible(!searchModalVisible);
        }}
      >
        <ThemedView
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Search Modal</Text>
          <Button
            title="close"
            size={BUTTON_SIZES.MD}
            onPress={() => setSearchModalVisible(!searchModalVisible)}
          />
        </ThemedView>
      </Modal>
      <ModalContainer
        visible={filterModalVisible}
        bottomModal
        onClose={() => {
          setFilterModalVisible(!filterModalVisible);
        }}
      >
        <Text>Filter Modal</Text>
        <Button
          title="close"
          size={BUTTON_SIZES.MD}
          onPress={() => setFilterModalVisible(!filterModalVisible)}
        />
      </ModalContainer>
    </ThemedView>
  );
};

export default ExploreHeader;
