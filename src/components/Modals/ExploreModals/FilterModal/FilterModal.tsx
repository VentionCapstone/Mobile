import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Modal, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, ButtonType, Icon, Input, Text, ThemedView } from 'src/components';
import { getIsDarkMode } from 'src/store/selectors';
import { BLACK, BUTTON_SIZES, WHITE_100, WHITE_200 } from 'src/styles';
import { IconName, OrderOptions } from 'src/types';

import { styles } from './FilterModal.styles';

type FilterModalProps = {
  modalOpen: boolean;
  changeOpen: () => void;
};

const FilterModal = ({ modalOpen, changeOpen }: FilterModalProps) => {
  const colors = useSelector(getIsDarkMode);
  const [orderByPrice, setOrderByPrice] = useState<OrderOptions>(null);
  const [orderByRooms, setOrderByRooms] = useState<OrderOptions>(null);
  const [orderByPeople, setOrderByPeople] = useState<OrderOptions>(null);

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [minRooms, setMinRooms] = useState<number>(0);
  const [maxRooms, setMaxRooms] = useState<number>(0);
  const [minPeople, setMinPeople] = useState<number>(0);
  const [maxPeople, setMaxPeople] = useState<number>(0);

  const changeOrderByPrice = (val: OrderOptions) => {
    setOrderByPrice(val);
  };
  const changeOrderByRooms = (val: OrderOptions) => {
    setOrderByRooms(val);
  };
  const changeOrderByPeople = (val: OrderOptions) => {
    setOrderByPeople(val);
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
              <Input style={styles.input} placeholder="Min" keyboardType="numeric" />
              <Input style={styles.input} placeholder="Max" keyboardType="numeric" />
            </View>
            <View style={styles.filterContentContent}>
              <Button
                title="none"
                size={BUTTON_SIZES.MD}
                type={orderByPrice === null ? ButtonType.SECONDARY : ButtonType.TERTIARY}
                onPress={() => changeOrderByPrice(null)}
              />
              <Button
                title="Asc"
                size={BUTTON_SIZES.MD}
                type={orderByPrice === 'asc' ? ButtonType.SECONDARY : ButtonType.TERTIARY}
                onPress={() => changeOrderByPrice('asc')}
              />
              <Button
                title="Desc"
                size={BUTTON_SIZES.MD}
                type={orderByPrice === 'desc' ? ButtonType.SECONDARY : ButtonType.TERTIARY}
                onPress={() => changeOrderByPrice('desc')}
              />
            </View>
          </View>
          {/* Rooms */}
          <View style={[styles.filterContainer, colors && styles.darkColorBackground]}>
            <View style={styles.filterContentContent}>
              <Text style={styles.filterTitle}>Order by number of rooms</Text>
            </View>
            <View style={styles.filterContentContent}>
              <Input style={styles.input} placeholder="Min" keyboardType="numeric" />
              <Input style={styles.input} placeholder="Max" keyboardType="numeric" />
            </View>
            <View style={styles.filterContentContent}>
              <Button
                title="none"
                size={BUTTON_SIZES.MD}
                type={orderByRooms === null ? ButtonType.SECONDARY : ButtonType.TERTIARY}
                onPress={() => changeOrderByRooms(null)}
              />
              <Button
                title="Asc"
                size={BUTTON_SIZES.MD}
                type={orderByRooms === 'asc' ? ButtonType.SECONDARY : ButtonType.TERTIARY}
                onPress={() => changeOrderByRooms('asc')}
              />
              <Button
                title="Desc"
                size={BUTTON_SIZES.MD}
                type={orderByRooms === 'desc' ? ButtonType.SECONDARY : ButtonType.TERTIARY}
                onPress={() => changeOrderByRooms('desc')}
              />
            </View>
          </View>
          {/* People */}
          <View style={[styles.filterContainer, colors && styles.darkColorBackground]}>
            <View style={styles.filterContentContent}>
              <Text style={styles.filterTitle}>Order by number of people</Text>
            </View>
            <View style={styles.filterContentContent}>
              <Input style={styles.input} placeholder="Min" keyboardType="numeric" />
              <Input style={styles.input} placeholder="Max" keyboardType="numeric" />
            </View>
            <View style={styles.filterContentContent}>
              <Button
                title="none"
                size={BUTTON_SIZES.MD}
                type={orderByPeople === null ? ButtonType.SECONDARY : ButtonType.TERTIARY}
                onPress={() => changeOrderByPeople(null)}
              />
              <Button
                title="Asc"
                size={BUTTON_SIZES.MD}
                type={orderByPeople === 'asc' ? ButtonType.SECONDARY : ButtonType.TERTIARY}
                onPress={() => changeOrderByPeople('asc')}
              />
              <Button
                title="Desc"
                size={BUTTON_SIZES.MD}
                type={orderByPeople === 'desc' ? ButtonType.SECONDARY : ButtonType.TERTIARY}
                onPress={() => changeOrderByPeople('desc')}
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
