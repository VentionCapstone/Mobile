import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Icon, Text } from 'src/components';
import { GREY_200 } from 'src/styles';
import { Accommodation, IconName } from 'src/types';

import { styles } from './AccommodationDetailsContent.style';

type Props = {
  accommodation?: Accommodation | null;
};

const AccommodationDetailsContent = ({ accommodation }: Props) => {
  const { t } = useTranslation();

  return (
    <View>
      <Text style={styles.headTitle}>{accommodation?.title}</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.address}>
          {accommodation?.address?.city}
          {', '}
          {accommodation?.address?.country}
        </Text>
        <View style={styles.availabilityContainer}>
          {accommodation?.available && <Text>{t('Available')}</Text>}
          <Icon
            name={accommodation?.available ? IconName.Check : IconName.Ellipse}
            color={accommodation?.available ? 'green' : GREY_200}
            size={20}
          />
        </View>
      </View>

      <Text style={styles.subtitle}>{`Full accomodation, ${accommodation?.address?.street}`}</Text>
      <Text style={styles.subtitle}>
        {`${accommodation?.allowedNumberOfPeople} guests · ${accommodation?.numberOfRooms} rooms · ${accommodation?.squareMeters} sq. meters`}
      </Text>
      <Text style={styles.description}>{accommodation?.description}</Text>
    </View>
  );
};

export default AccommodationDetailsContent;
