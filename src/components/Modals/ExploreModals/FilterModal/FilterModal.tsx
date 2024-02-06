import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { DEFAULT_FILTER_VALUES } from 'src/constants/filter';
import { useAppDispatch } from 'src/store';
import { getColors, getFilterParams } from 'src/store/selectors';
import { accommodationListActions } from 'src/store/slices';
import { BUTTON_SIZES } from 'src/styles';
import { GetAccommodationQueryParams, SortOrder } from 'src/types';

import { styles } from './FilterModal.styles';
import FilterOrderButtons from './FilterSection';
import Button from '../../../Button/Button';
import { ButtonType } from '../../../Button/Button.types';
import Text from '../../../Text/Text';
import NumericInput from '../../../inputs/NumericInput/NumericInput';
import ModalContainer from '../../ModalContainer/ModalContainer';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const FilterModal = ({ visible, onClose }: Props) => {
  const colors = useSelector(getColors);
  const dispatch = useAppDispatch();
  const filterParams = useSelector(getFilterParams);
  const { t } = useTranslation();

  const [filterValues, setFilterValues] = useState<GetAccommodationQueryParams>({
    minPrice: filterParams.minPrice,
    maxPrice: filterParams.maxPrice,
    minPeople: filterParams.minPeople,
    maxPeople: filterParams.maxPeople,
    minRooms: filterParams.minRooms,
    maxRooms: filterParams.maxRooms,
    orderByPeople: filterParams.orderByPeople,
    orderByRoom: filterParams.orderByRoom,
    orderByPrice: filterParams.orderByPrice,
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

  const handlePriceOrderChange = useCallback((priceOrder: SortOrder | null) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      orderByPrice: priceOrder,
    }));
  }, []);

  const handlePeopleOrderChange = useCallback((peopleOrder: SortOrder | null) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      orderByPeople: peopleOrder,
    }));
  }, []);

  const handleRoomOrderChange = useCallback((roomOrder: SortOrder | null) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      orderByRoom: roomOrder,
    }));
  }, []);

  const handleApply = () => {
    dispatch(accommodationListActions.setFilterParams({ ...filterParams, ...filterValues }));
    onClose();
  };

  const handleResetFilters = () => {
    dispatch(accommodationListActions.resetFilters());
    setFilterValues(DEFAULT_FILTER_VALUES);
  };

  return (
    <ModalContainer bottomModal visible={visible} onClose={onClose} title={t('Search options')}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.filterContainer, { backgroundColor: colors.background }]}>
          <Text style={styles.filterTitle}>{t('Price')}</Text>

          <View style={styles.inputRow}>
            <NumericInput
              label={t('Minimum')}
              value={filterValues.minPrice!}
              onChangeText={handleInputChange('minPrice')}
              style={styles.numericInput}
            />
            <NumericInput
              label={t('Maximum')}
              value={filterValues.maxPrice!}
              onChangeText={handleInputChange('maxPrice')}
              style={styles.numericInput}
            />
          </View>

          <FilterOrderButtons
            onOrderStateChange={handlePriceOrderChange}
            orderState={filterValues.orderByPrice}
          />
        </View>

        <View style={[styles.filterContainer, { backgroundColor: colors.background }]}>
          <Text style={styles.filterTitle}>{t('Rooms')}</Text>

          <View style={styles.inputRow}>
            <NumericInput
              label={t('Minimum')}
              value={filterValues.minRooms!}
              onChangeText={handleInputChange('minRooms')}
              style={styles.numericInput}
            />
            <NumericInput
              label={t('Maximum')}
              value={filterValues.maxRooms!}
              onChangeText={handleInputChange('maxRooms')}
              style={styles.numericInput}
            />
          </View>

          <FilterOrderButtons
            onOrderStateChange={handleRoomOrderChange}
            orderState={filterValues.orderByRoom}
          />
        </View>

        <View style={[styles.filterContainer, { backgroundColor: colors.background }]}>
          <Text style={styles.filterTitle}>{t('People')}</Text>

          <View style={styles.inputRow}>
            <NumericInput
              label={t('Minimum')}
              value={filterValues.minPeople!}
              onChangeText={handleInputChange('minPeople')}
              style={styles.numericInput}
            />
            <NumericInput
              label={t('Maximum')}
              value={filterValues.maxPeople!}
              onChangeText={handleInputChange('maxPeople')}
              style={styles.numericInput}
            />
          </View>

          <FilterOrderButtons
            onOrderStateChange={handlePeopleOrderChange}
            orderState={filterValues.orderByPeople}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={t('Default')}
          type={ButtonType.TERTIARY}
          size={BUTTON_SIZES.SM}
          onPress={handleResetFilters}
        />

        <Button title={t('Apply')} size={BUTTON_SIZES.SM} onPress={handleApply} />
      </View>
    </ModalContainer>
  );
};

export default FilterModal;
