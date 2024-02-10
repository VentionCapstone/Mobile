import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Icon, Text } from 'src/components';
import { Accommodation, IconName } from 'src/types';

import { styles } from './AmenitiesCard.style';
import { getAmenitiesBadges, getOtherAmenitiesBadges } from '../../AccommodationDetails.utils.ts';

type Props = {
  accommodation?: Accommodation | null;
};

const AmenitiesCard = ({ accommodation }: Props) => {
  const { t } = useTranslation();

  const amenitiesBadges = useMemo(() => {
    if (accommodation?.amenities) {
      const amenitiesBadges = getAmenitiesBadges(accommodation?.amenities);
      return amenitiesBadges.map((item, index) => (
        <View key={index} style={styles.badge}>
          <Icon name={item.icon} size={20} iconSet={item.iconSet} />
          <Text style={styles.badgeText}>{item?.text}</Text>
        </View>
      ));
    }
  }, [accommodation]);

  const otherAmenitiesBadgesMemo = useMemo(() => {
    if (accommodation?.amenities) {
      const otherAmenitiesBadges = getOtherAmenitiesBadges(accommodation?.amenities);
      return otherAmenitiesBadges.map((amenity, index) => (
        <View key={index} style={styles.badge}>
          <Icon name={IconName.Check} size={20} />
          <Text style={styles.badgeText}>{amenity?.text}</Text>
        </View>
      ));
    }
  }, [accommodation]);

  return (
    <View>
      {amenitiesBadges && (
        <View>
          <Text style={styles.amenitiesTitle}>{t('Amenities')}</Text>
          <View style={styles.badgesContainer}>
            {amenitiesBadges}
            {otherAmenitiesBadgesMemo}
          </View>
        </View>
      )}
    </View>
  );
};

export default AmenitiesCard;
