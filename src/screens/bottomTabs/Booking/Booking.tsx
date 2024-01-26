import { useTranslation } from 'react-i18next';
import { Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';

import styles from './Booking.style';

const Booking = () => {
  const { t } = useTranslation();

  return (
    <ScreenTemplate>
      <Text style={styles.title}>{t('Booking is not available now!')}</Text>
    </ScreenTemplate>
  );
};

export default Booking;
