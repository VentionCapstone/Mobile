import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';
import { RED_200 } from 'src/styles';

import { styles } from './DatePicker.style';
import Text from '../Text/Text';

type Props = {
  value: string;
  placeholder?: string;
  label?: string;
  width?: number;
  onDateChange: (selectedDate: string) => void;
  error?: string;
};

const DatePicker = ({ value, placeholder, label, width, onDateChange, error }: Props) => {
  const colors = useSelector(getColors);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleDateChange = (selectedDate: Date) => {
    const dateString = selectedDate.toISOString();
    onDateChange(dateString);
    setShowDatePicker(false);
  };

  const dateForPlaceholder = value ? new Date(value).toLocaleDateString('en-CA') : ''; // yyyy/mm/dd

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
          {dateForPlaceholder || placeholder}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {showDatePicker && (
        <View style={{ width: '90%' }}>
          <DateTimePicker
            is24Hour
            mode="date"
            display="default"
            testID="dateTimePicker"
            value={value ? new Date(value) : new Date()}
            minimumDate={new Date()}
            onChange={(event, selectedDate) => {
              if (event.type === 'set' && selectedDate) {
                handleDateChange(selectedDate);
              }
            }}
          />
        </View>
      )}
    </View>
  );
};

export default DatePicker;
