import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, ButtonType, Icon, Input, Text, ThemedView } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { DEFAULT_FILTER_VALUES } from 'src/constants/defaultSearchVelues';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getFilterSettings, getIsDarkMode } from 'src/store/selectors';
import { accommodationListActions } from 'src/store/slices';
import { BLACK, BUTTON_SIZES, WHITE_100, WHITE_200 } from 'src/styles';
import { IconName, OrderOptions, SearchValues } from 'src/types';

import { styles } from './FilterModal.styles';

const FilterModal = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const colors = useSelector(getIsDarkMode);
  const filter = useSelector(getFilterSettings);
  const dispatch = useAppDispatch();
  const { location, checkInDate, checkOutDate, ...rest } = filter;
  const [formValues, setFormValues] = useState<SearchValues>(rest);

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

  const saveFilterValues = () => {
    dispatch(accommodationListActions.setFilter({...formValues, location, checkInDate, checkOutDate}));
    navigation.goBack();
  };

  const setFilterToDefault = () => {
    setFormValues(DEFAULT_FILTER_VALUES);
  };

  return (
    <ScreenTemplate
      headerShown={false}
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.5)',
        marginTop: Platform.OS === 'android' ? 30 : undefined,
      }}
    >
      <ThemedView style={styles.container}>
        <View style={styles.modalHeader}>
          <StatusBar backgroundColor={colors ? BLACK : WHITE_100} />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name={IconName.Close} size={30} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Search options</Text>
          <View style={{ width: 30 }} />
        </View>

        {/* Price */}
        <View style={[styles.filterContainer, colors && styles.darkColorBackground]}>
          <View style={styles.filterContentContent}>
            <Text style={styles.filterTitle}>Order by Price</Text>
          </View>
          <View style={styles.filterContentContent}>
            <Input
              style={styles.input}
              value={formValues.minPrice?.toString()}
              placeholder="Min"
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('minPrice', Number(value))}
            />
            <Input
              style={styles.input}
              value={formValues.maxPrice?.toString()}
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
              type={formValues.orderByPrice === 'asc' ? ButtonType.SECONDARY : ButtonType.TERTIARY}
              onPress={() => changeOrder('orderByPrice', 'asc')}
            />
            <Button
              title="Desc"
              size={BUTTON_SIZES.MD}
              type={formValues.orderByPrice === 'desc' ? ButtonType.SECONDARY : ButtonType.TERTIARY}
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
              value={formValues.minRooms?.toString()}
              placeholder="Min"
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('minRooms', Number(value))}
            />
            <Input
              style={styles.input}
              value={formValues.maxRooms?.toString()}
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
              type={formValues.orderByRooms === 'asc' ? ButtonType.SECONDARY : ButtonType.TERTIARY}
              onPress={() => changeOrder('orderByRooms', 'asc')}
            />
            <Button
              title="Desc"
              size={BUTTON_SIZES.MD}
              type={formValues.orderByRooms === 'desc' ? ButtonType.SECONDARY : ButtonType.TERTIARY}
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
              value={formValues.minPeople?.toString()}
              placeholder="Min"
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('minPeople', Number(value))}
            />
            <Input
              style={styles.input}
              value={formValues.maxPeople?.toString()}
              placeholder="Max"
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('maxPeople', Number(value))}
            />
          </View>
          <View style={styles.filterContentContent}>
            <Button
              title="none"
              size={BUTTON_SIZES.MD}
              type={formValues.orderByPeople === null ? ButtonType.SECONDARY : ButtonType.TERTIARY}
              onPress={() => changeOrder('orderByPeople', null)}
            />
            <Button
              title="Asc"
              size={BUTTON_SIZES.MD}
              type={formValues.orderByPeople === 'asc' ? ButtonType.SECONDARY : ButtonType.TERTIARY}
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
        <TouchableOpacity onPress={setFilterToDefault}>
          <Text style={{ fontSize: 20, textDecorationLine: 'underline' }}>Default</Text>
        </TouchableOpacity>
        <Button title="Apply" size={BUTTON_SIZES.MD} onPress={saveFilterValues} />
      </ThemedView>
    </ScreenTemplate>
  );
};

export default FilterModal;
