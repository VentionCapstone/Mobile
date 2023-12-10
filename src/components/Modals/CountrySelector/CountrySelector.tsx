import React, { useState } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import ThemedView from 'src/components/ThemedView/ThemedView';
import { getColors } from 'src/store/selectors';
import { Country, CountryOption } from 'src/types/common';
import { IconName } from 'src/types/ui';

import { styles } from './CountrySelector.style';
import ModalContainer from '../ModalContainer/ModalContainer';

const countries: CountryOption[] = [{ name: Country.UZBEKISTAN }, { name: Country.KAZAKHSTAN }];

type Props = {
  onSelect: (country: CountryOption) => void;
};

const CountrySelector = ({ onSelect }: Props) => {
  const colors = useSelector(getColors);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>({
    name: Country.UZBEKISTAN,
  });

  const handleCountrySelect = (country: CountryOption) => {
    setSelectedCountry(country);
    onSelect(country);
    setModalVisible(false);
  };

  return (
    <ThemedView>
      <TouchableOpacity
        style={[styles.selectorButton, { backgroundColor: colors.secondaryBackground }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedCountry}>{selectedCountry.name}</Text>
        <Icon name={IconName.ChevronDown} size={20} />
      </TouchableOpacity>

      <ModalContainer visible={modalVisible} onClose={() => setModalVisible(false)}>
        <FlatList
          data={countries}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.countryItem} onPress={() => handleCountrySelect(item)}>
              <Text style={styles.optionText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </ModalContainer>
    </ThemedView>
  );
};

export default CountrySelector;
