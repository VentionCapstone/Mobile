import React, { useMemo } from 'react'
import { TouchableOpacity } from 'react-native';
import { DEFAULT_DURATION } from 'src/constants/constantLabels';
import Collapsable from '../Collapsable/Collapsable';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';
import Text from 'src/components/Text/Text';
import { styles } from './CollapsableDatePicker.styles';
import DatePicker, { getToday } from 'react-native-modern-datepicker';
import { WHITE, TOMATO, GREY_200, BLACK } from 'src/styles';

type CollapsableDatePickerProps = {
  title: string,
  date: string,
  stateToggleCollapsed: boolean,
  toggleCollapse: () => void,
  minimumDate: string,
  handleDateChange: (newDate: string) => void,
  clearDate: () => void
};

export const CollapsableDatePicker = ({
  title,
  date,
  stateToggleCollapsed,
  toggleCollapse,
  minimumDate,
  handleDateChange,
  clearDate
}: CollapsableDatePickerProps) => {
  const colors = useSelector(getColors);
  const DatePickerStyles = useMemo(() => {
    const options = {
      selectedTextColor: WHITE,
      mainColor: TOMATO,
      textSecondaryColor: GREY_200,
    }
    const colorOptions =
      colors ?
       {backgroundColor: BLACK,
        textHeaderColor: WHITE,
        textDefaultColor: WHITE,
        borderColor: BLACK,}
      :
       {backgroundColor: WHITE,
        textHeaderColor: BLACK,
        textDefaultColor: BLACK,
        borderColor: WHITE,}
    return {...options, ...colorOptions}
  }, [colors])

  return (
    <Collapsable
    title={title}
    subtitle={date ? date : DEFAULT_DURATION}
    contentTitle={title}
    collapsed={stateToggleCollapsed}
    onTouch={toggleCollapse}
  >
    <DatePicker
      options={DatePickerStyles}
      mode="calendar"
      minimumDate={minimumDate}
      onSelectedChange={handleDateChange}
      current={getToday()}
      selected={date ? date : undefined}
    />
    <TouchableOpacity onPress={clearDate}>
      <Text style={styles.buttonText}>Clear</Text>
    </TouchableOpacity>
  </Collapsable>);
}