import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'src/components/Button';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import ThemedView from 'src/components/ThemedView/ThemedView';
import { Input, NumericInput } from 'src/components/inputs';
import { getColors } from 'src/store/selectors';
import { AddressValues, CountryOption } from 'src/types';
import { IconName } from 'src/types/ui';

import { styles } from './Address.style';
import ModalContainer from '../../ModalContainer/ModalContainer';
import CountrySelector from '../CountrySelector/CountrySelector';

type Props = {
  onSelect: (addressValues: any) => void;
};

const Address = ({ onSelect }: Props) => {
  const colors = useSelector(getColors);

  const [modalVisible, setModalVisible] = useState(false);
  const [addressValues, setAddressValues] = useState<AddressValues>({
    city: '',
    street: '',
    country: '',
    zipCode: 0,
    lattitude: 0,
    longtitude: 0,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setAddressValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleCountrySelect = (country: CountryOption) => {
    setAddressValues({ ...addressValues, country: country.name });
  };

  const handleSaveAddress = () => {
    setModalVisible(false);
    onSelect(addressValues);
  };

  return (
    <ThemedView>
      <TouchableOpacity
        style={[styles.addressButton, { backgroundColor: colors.secondaryBackground }]}
        onPress={() => setModalVisible(true)}
      >
        <Text>Address</Text>
        <Icon name={IconName.ChevronDown} size={20} />
      </TouchableOpacity>

      <ModalContainer bottomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Address</Text>

          <Input
            placeholder="City"
            value={addressValues.city}
            onChangeText={(text) => handleInputChange('city', text)}
          />
          <Input
            placeholder="Street"
            value={addressValues.street}
            onChangeText={(text) => handleInputChange('street', text)}
          />

          <Text style={styles.label}>Select your country</Text>
          <CountrySelector onSelect={handleCountrySelect} />

          <NumericInput
            placeholder="Zip Code"
            value={addressValues.zipCode}
            onChangeText={(value) => handleInputChange('zipCode', value)}
          />

          <Button title="Save" onPress={handleSaveAddress} />
        </View>
      </ModalContainer>
    </ThemedView>
  );
};

export default Address;
