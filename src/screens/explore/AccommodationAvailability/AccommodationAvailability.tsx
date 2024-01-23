import { View, Text } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

const AccommodationAvailability = () => {
  const availableDates = [
    ['2023-12-15', '2023-12-16'],
    ['2023-12-18', '2023-12-26'],
  ];

  return (
    <View>
      <Text>AccommodationAvailability</Text>
      {availableDates.map((dates, index) => (
        <View key={index}>
          <Text style={{ fontWeight: 'bold' }}>Available Dates:</Text>
          <DatePicker
            mode="range"
            options={dates}
            onSelectedChange={(selectedDates) => console.log(selectedDates)}
            style={{ backgroundColor: 'lightgray', borderRadius: 5, padding: 10 }}
          />
        </View>
      ))}
    </View>
  );
};

export default AccommodationAvailability;
