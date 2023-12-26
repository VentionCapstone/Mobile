import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';
import { RED_200, WHITE_100 } from 'src/styles';

import { styles } from './DatePicker.style';
import { getFormattedDate, getInitialDate } from './DatePicker.utils';
import Text from '../../../Text/Text';
import ModalContainer from '../../ModalContainer/ModalContainer';

type Props = {
  label?: string;
  width?: number;
  onDateChange: (selectedDate: string) => void;
  error?: string;
  initialValue?: string | undefined;
};

const DateTimePicker = ({ label, width, onDateChange, error, initialValue }: Props) => {
  const colors = useSelector(getColors);
  const initialDate = getInitialDate({ initialValue });

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);

  const handleOnDateChange = (value: string) => {
    const formattedDate = getFormattedDate({ value });

    setSelectedDate(value);
    onDateChange(formattedDate);
    setShowDatePicker(false);
  };

  return (
    <View>
      <Text style={styles.labelText}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.openDateButton,
          {
            width,
            backgroundColor: colors.secondaryBackground,
            borderColor: error ? RED_200 : 'transparent',
          },
        ]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={[styles.placeholder, { color: error ? RED_200 : colors.placeholder }]}>
          {selectedDate || 'yyyy-mm-dd'}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <ModalContainer visible={showDatePicker} onClose={() => setShowDatePicker(false)}>
        <DatePicker
          options={{
            textSecondaryColor: colors.placeholder,
            selectedTextColor: WHITE_100,
            textDefaultColor: colors.text,
            backgroundColor: colors.secondaryBackground,
            textHeaderColor: colors.title,
            mainColor: colors.tint,
          }}
          onSelectedChange={(value) => handleOnDateChange(value)}
          minimumDate={new Date().toISOString()}
          mode="calendar"
        />
      </ModalContainer>
    </View>
  );
};

export default DateTimePicker;
