import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ImageCarousel, Text } from 'src/components';
import { Accommodation } from 'src/types';

import { styles } from './AccommodationImages.style';
import { formatDate } from '../../AccommodationDetails.utils.ts';

type Props = {
  accommodation?: Accommodation | null;
};

const AccommodationImages = ({ accommodation }: Props) => {
  const { t } = useTranslation();

  const accommodationMedia = useMemo(
    () => accommodation?.media?.map((media) => media.imageUrl) || [],
    [accommodation]
  );

  return (
    <View>
      <View style={{ marginVertical: 30 }}>
        <Text style={styles.title}>{t('More photos')}</Text>
        <ImageCarousel images={accommodationMedia} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text>{t('Available')}</Text>
        <Text>
          {t('From:')} {formatDate(accommodation?.availableFrom ?? '')}
        </Text>
        <Text>
          {t('Till:')} {formatDate(accommodation?.availableTo ?? '')}
        </Text>
      </View>
    </View>
  );
};

export default AccommodationImages;
