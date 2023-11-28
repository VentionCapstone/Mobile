import React, { useState } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import ThemedView from 'src/components/ThemedView/ThemedView';
import { GREY_400 } from 'src/styles';
import { useTheme } from 'src/theme';
import { CountryOptions } from 'src/types';
import { IconName } from 'src/types/ui';

import { styles } from './CountrySelector.style';
import ModalContainer from '../ModalContainer/ModalContainer';

interface Country {
  name: CountryOptions;
}

const countries: Country[] = [
  { name: CountryOptions.UZBEKISTAN },
  { name: CountryOptions.KAZAKHSTAN },
];

type Props = {
  onSelect: (country: string) => void;
};

const CountrySelector = ({ onSelect }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryOptions>(CountryOptions.UZBEKISTAN);
  const { colors } = useTheme();

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country.name);
    onSelect(country.name);
    setModalVisible(false);
  };

  return (
    <ThemedView>
      <TouchableOpacity
        style={[styles.selectorButton, { backgroundColor: colors.secondaryBackground }]}
        onPress={() => setModalVisible(true)}
      >
        <Text>{selectedCountry}</Text>
        <Icon name={IconName.ChevronDown} size={20} />
      </TouchableOpacity>

      <ModalContainer visible={modalVisible} onClose={() => setModalVisible(false)}>
        <FlatList
          data={countries}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.countryItem} onPress={() => handleCountrySelect(item)}>
              <Text color={GREY_400}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </ModalContainer>
    </ThemedView>
  );
};

export default CountrySelector;
