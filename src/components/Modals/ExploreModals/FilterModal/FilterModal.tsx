import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Modal, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, ButtonType, Icon, Input, Text, ThemedView } from 'src/components';
import { getIsDarkMode } from 'src/store/selectors';
import { BLACK, BUTTON_SIZES, WHITE_100, WHITE_200 } from 'src/styles';
import { IconName, ListingSearchValues, OrderOptions } from 'src/types';

import { styles } from './FilterModal.styles';
import { DEFAULT_FILTER_VALUES } from './FilterModal.utils';

type FilterModalProps = {
  modalOpen: boolean;
  changeOpen: () => void;
};

const FilterModal = ({ modalOpen, changeOpen }: FilterModalProps) => {
  const colors = useSelector(getIsDarkMode);
  const [formValues, setFormValues] = useState<ListingSearchValues>(DEFAULT_FILTER_VALUES);

  const changeOrder = (key: keyof typeof formValues, val: OrderOptions) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [key]: val,
    }));
  };

  const handleInputChange = (key: keyof typeof formValues, value: number) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [key]: value,
    }));
  };

  return (
    <Modal
      animationType="fade"
      visible={modalOpen}
      transparent
      onRequestClose={() => {
        changeOpen();
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: colors ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.5)',
        }}
      >
        <ThemedView style={styles.container}>
          <SafeAreaView>
            <View style={styles.modalHeader}>
              <StatusBar backgroundColor={colors ? BLACK : WHITE_100} />
              <TouchableOpacity onPress={() => changeOpen()}>
                <Icon name={IconName.Close} size={30} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Search options</Text>
              <View style={{ width: 30 }} />
            </View>
          </SafeAreaView>
          {/* Price */}
          <View style={[styles.filterContainer, colors && styles.darkColorBackground]}>
            <View style={styles.filterContentContent}>
              <Text style={styles.filterTitle}>Order by Price</Text>
            </View>
            <View style={styles.filterContentContent}>
              <Input
                style={styles.input}
                placeholder="Min"
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('minPrice', Number(value))}
              />
              <Input
                style={styles.input}
                placeholder="Max"
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('maxPrice', Number(value))}
              />
            </View>
            <View style={styles.filterContentContent}>
              <Button
                title="none"
                size={BUTTON_SIZES.MD}
                type={formValues.orderByPrice === null ? ButtonType.SECONDARY : ButtonType.TERTIARY}
                onPress={() => changeOrder('orderByPrice', null)}
              />
              <Button
                title="Asc"
                size={BUTTON_SIZES.MD}
                type={
                  formValues.orderByPrice === 'asc' ? ButtonType.SECONDARY : ButtonType.TERTIARY
                }
                onPress={() => changeOrder('orderByPrice', 'asc')}
              />
              <Button
                title="Desc"
                size={BUTTON_SIZES.MD}
                type={
                  formValues.orderByPrice === 'desc' ? ButtonType.SECONDARY : ButtonType.TERTIARY
                }
                onPress={() => changeOrder('orderByPrice', 'desc')}
              />
            </View>
          </View>
          {/* Rooms */}
          <View style={[styles.filterContainer, colors && styles.darkColorBackground]}>
            <View style={styles.filterContentContent}>
              <Text style={styles.filterTitle}>Order by number of rooms</Text>
            </View>
            <View style={styles.filterContentContent}>
              <Input
                style={styles.input}
                placeholder="Min"
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('minRooms', Number(value))}
              />
              <Input
                style={styles.input}
                placeholder="Max"
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('maxRooms', Number(value))}
              />
            </View>
            <View style={styles.filterContentContent}>
              <Button
                title="none"
                size={BUTTON_SIZES.MD}
                type={formValues.orderByRooms === null ? ButtonType.SECONDARY : ButtonType.TERTIARY}
                onPress={() => changeOrder('orderByRooms', null)}
              />
              <Button
                title="Asc"
                size={BUTTON_SIZES.MD}
                type={
                  formValues.orderByRooms === 'asc' ? ButtonType.SECONDARY : ButtonType.TERTIARY
                }
                onPress={() => changeOrder('orderByRooms', 'asc')}
              />
              <Button
                title="Desc"
                size={BUTTON_SIZES.MD}
                type={
                  formValues.orderByRooms === 'desc' ? ButtonType.SECONDARY : ButtonType.TERTIARY
                }
                onPress={() => changeOrder('orderByRooms', 'desc')}
              />
            </View>
          </View>
          {/* People */}
          <View style={[styles.filterContainer, colors && styles.darkColorBackground]}>
            <View style={styles.filterContentContent}>
              <Text style={styles.filterTitle}>Order by number of people</Text>
            </View>
            <View style={styles.filterContentContent}>
              <Input
                style={styles.input}
                placeholder="Min"
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('minPeople', Number(value))}
              />
              <Input
                style={styles.input}
                placeholder="Max"
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('maxPeople', Number(value))}
              />
            </View>
            <View style={styles.filterContentContent}>
              <Button
                title="none"
                size={BUTTON_SIZES.MD}
                type={
                  formValues.orderByPeople === null ? ButtonType.SECONDARY : ButtonType.TERTIARY
                }
                onPress={() => changeOrder('orderByPeople', null)}
              />
              <Button
                title="Asc"
                size={BUTTON_SIZES.MD}
                type={
                  formValues.orderByPeople === 'asc' ? ButtonType.SECONDARY : ButtonType.TERTIARY
                }
                onPress={() => changeOrder('orderByPeople', 'asc')}
              />
              <Button
                title="Desc"
                size={BUTTON_SIZES.MD}
                type={
                  formValues.orderByPeople === 'desc' ? ButtonType.SECONDARY : ButtonType.TERTIARY
                }
                onPress={() => changeOrder('orderByPeople', 'desc')}
              />
            </View>
          </View>
        </ThemedView>
        <ThemedView style={[styles.footer, colors && { borderColor: WHITE_200 }]}>
          <TouchableOpacity onPress={() => changeOpen()}>
            <Text style={{ fontSize: 20, textDecorationLine: 'underline' }}>Default</Text>
          </TouchableOpacity>
          <Button title="Apply" size={BUTTON_SIZES.MD} onPress={() => changeOpen()} />
        </ThemedView>
      </View>
    </Modal>
  );
};

export default FilterModal;
