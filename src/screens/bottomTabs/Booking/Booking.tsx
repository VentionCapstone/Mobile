import { Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';

import styles from './Booking.style';

const Booking = () => {
  return (
    <ScreenTemplate>
      <Text style={styles.title}>Booking is not available now!</Text>
    </ScreenTemplate>
  );
};

export default Booking;
