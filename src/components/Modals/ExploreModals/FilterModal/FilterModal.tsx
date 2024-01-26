import { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, ButtonType, NumericInput, Text } from 'src/components';
import { getColors } from 'src/store/selectors';
import { BUTTON_SIZES } from 'src/styles';
import { GetAccommodationQueryParams, SortOrder } from 'src/types';

import { styles } from './FilterModal.styles';
import FilterOrderButtons from './FilterSection';
import ModalContainer from '../../ModalContainer/ModalContainer';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (values: GetAccommodationQueryParams) => void;
};

const FilterModal = ({ visible, onClose, onSelect }: Props) => {
  const colors = useSelector(getColors);
  const [selectedOrderPeople, setSelectedOrderPeople] = useState<SortOrder>(SortOrder.ASC);
  const [selectedOrderRoom, setSelectedOrderRooms] = useState<SortOrder>(SortOrder.ASC);
  const [selectedOrderPrice, setSelectedOrderPrice] = useState<SortOrder>(SortOrder.ASC);
  const [filterValues, setFilterValues] = useState<GetAccommodationQueryParams>({
    minPrice: 0,
    maxPrice: 0,
    minPeople: 0,
    maxPeople: 0,
    minRooms: 0,
    maxRooms: 0,
    orderByPeople: selectedOrderPeople,
    orderByRoom: selectedOrderRoom,
    orderByPrice: selectedOrderPrice,
  });

  const handleInputChange = useCallback(
    (fieldName: keyof GetAccommodationQueryParams) => (value: number | null) => {
      setFilterValues((prevValues) => ({
        ...prevValues,
        [fieldName]: value,
      }));
    },
    []
  );

  console.log(filterValues);

  const handleApply = () => {
    onSelect(filterValues);
    onClose();
  };

  return (
    <ModalContainer bottomModal visible={visible} onClose={onClose}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>Search options</Text>

        <View style={[styles.filterContainer, { backgroundColor: colors.background }]}>
          <Text style={styles.filterTitle}>Price</Text>

          <View style={styles.inputRow}>
            <NumericInput
              label="Minimum"
              value={filterValues.minPrice!}
              onChangeText={handleInputChange('minPrice')}
              style={styles.numericInput}
            />
            <NumericInput
              label="Maximum"
              value={filterValues.maxPrice!}
              onChangeText={handleInputChange('maxPrice')}
              style={styles.numericInput}
            />
          </View>

          <FilterOrderButtons
            setOrderState={setSelectedOrderPrice}
            orderState={selectedOrderPrice}
          />
        </View>

        <View style={[styles.filterContainer, { backgroundColor: colors.background }]}>
          <Text style={styles.filterTitle}>Rooms</Text>

          <View style={styles.inputRow}>
            <NumericInput
              label="Minimum"
              value={filterValues.minRooms!}
              onChangeText={handleInputChange('minRooms')}
              style={styles.numericInput}
            />
            <NumericInput
              label="Maximum"
              value={filterValues.maxRooms!}
              onChangeText={handleInputChange('maxRooms')}
              style={styles.numericInput}
            />
          </View>

          <FilterOrderButtons
            setOrderState={setSelectedOrderRooms}
            orderState={selectedOrderRoom}
          />
        </View>

        <View style={[styles.filterContainer, { backgroundColor: colors.background }]}>
          <Text style={styles.filterTitle}>People</Text>

          <View style={styles.inputRow}>
            <NumericInput
              label="Minimum"
              value={filterValues.minPeople!}
              onChangeText={handleInputChange('minPeople')}
              style={styles.numericInput}
            />
            <NumericInput
              label="Maximum"
              value={filterValues.maxPeople!}
              onChangeText={handleInputChange('maxPeople')}
              style={styles.numericInput}
            />
          </View>

          <FilterOrderButtons
            setOrderState={setSelectedOrderPeople}
            orderState={selectedOrderPeople}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Default"
          type={ButtonType.TERTIARY}
          size={BUTTON_SIZES.SM}
          onPress={() => {}}
        />
        <Button title="Apply" size={BUTTON_SIZES.SM} onPress={handleApply} />
      </View>
    </ModalContainer>
  );
};

export default FilterModal;
