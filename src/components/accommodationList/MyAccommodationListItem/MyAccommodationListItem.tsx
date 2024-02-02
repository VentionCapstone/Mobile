import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import { getColors } from 'src/store/selectors';
import { RED_100, TOMATO, WHITE_200 } from 'src/styles';
import { MyAccommodation, IconName } from 'src/types';

import { styles } from './MyAccommodationListItem.style';
import { getLocationName } from './MyAccommodationListItem.utils';

type Props = {
  accommodationDetails: MyAccommodation;
  onEdit: (accommodation: MyAccommodation) => void;
  onDelete: (accommodationId: string) => void;
  onNavigate: () => void;
  loader: boolean;
};

const MyAccommodationListItem = ({
  accommodationDetails,
  onDelete,
  onEdit,
  onNavigate,
  loader,
}: Props) => {
  const colors = useSelector(getColors);
  const { t } = useTranslation();
  const { id, price, thumbnailUrl, address } = accommodationDetails;

  const locationName = getLocationName(address);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.secondaryBackground }]}
      onPress={onNavigate}
    >
      <View style={styles.imageContainer}>
        {loader && <ActivityIndicator size="small" color={TOMATO} />}

        {!thumbnailUrl || thumbnailUrl === 'none' ? (
          <Icon name={IconName.Image} size={70} color={WHITE_200} />
        ) : (
          <Image
            source={{
              uri: thumbnailUrl,
            }}
            style={styles.thumbnail}
          />
        )}
      </View>
      <View style={styles.descriptionContainer}>
        <View style={styles.titleContainer}>
          <Icon name={IconName.Location} size={20} />
          <Text style={styles.city} numberOfLines={1} ellipsizeMode="tail">
            {locationName}
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>$</Text>
          <Text style={styles.price}>{price}</Text>
          <Text>/{t('night')}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onEdit(accommodationDetails)}
          >
            <Icon name={IconName.Edit} iconSet="material" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(id)}>
            <Icon name={IconName.Delete} iconSet="material" size={20} color={RED_100} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(MyAccommodationListItem);
