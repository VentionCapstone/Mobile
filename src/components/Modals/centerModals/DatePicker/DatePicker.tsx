import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { useSelector } from 'react-redux';
import Icon from 'src/components/Icon/Icon';
import { getColors } from 'src/store/selectors';
import { WHITE_100 } from 'src/styles';
import { IconName } from 'src/types';
import { getFormattedDate, getInitialDate } from 'src/utils';

import { styles } from './DatePicker.style';
import Text from '../../../Text/Text';
import ModalContainer from '../../ModalContainer/ModalContainer';

type Props = {
  initialValue?: string | null;
  label?: string;
  minDate?: string;
  maxDate?: string;
  onDateChange: (selectedDate: string) => void;
};

const DateTimePicker = ({ initialValue, label, minDate, maxDate, onDateChange }: Props) => {
  const colors = useSelector(getColors);
  const initialDate = getInitialDate(initialValue);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(initialDate);

  const handleOnDateChange = (value: string) => {
    const formattedDate = getFormattedDate(value);

    setSelectedDate(value);
    onDateChange(formattedDate);
    setShowDatePicker(false);
  };

  const handleOpenDatePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      <TouchableOpacity
        style={[styles.openDateButton, { backgroundColor: colors.secondaryBackground }]}
        onPress={handleOpenDatePicker}
      >
        <Icon name={IconName.Calendar} size={20} />
        <Text style={[styles.placeholder, { color: colors.placeholder }]}>
          {selectedDate || 'yyyy-mm-dd'}
        </Text>
      </TouchableOpacity>

      <ModalContainer visible={showDatePicker} onClose={() => setShowDatePicker(false)}>
        <DatePicker
          options={{
            textSecondaryColor: colors.placeholder,
            selectedTextColor: WHITE_100,
            textDefaultColor: colors.text,
            backgroundColor: colors.background,
            textHeaderColor: colors.title,
            mainColor: colors.tint,
          }}
          onSelectedChange={(value) => handleOnDateChange(value)}
          minimumDate={minDate || new Date().toISOString()}
          maximumDate={maxDate}
          mode="calendar"
        />
      </ModalContainer>
    </View>
  );
};

export default DateTimePicker;
