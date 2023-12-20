import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import { getAccommodationLoader, getColors } from 'src/store/selectors';
import { RED_100 } from 'src/styles';
import { Accommodation, IconName } from 'src/types';

import { styles } from './MyAccommodationListItem.style';

type Props = {
  accommodationDetails: Accommodation;
  onEdit: (accommodation: Accommodation) => void;
  onDelete: (accommodationId: string) => void;
};

const MyAccommodationListItem = ({ accommodationDetails, onDelete, onEdit }: Props) => {
  const colors = useSelector(getColors);
  const loader = useSelector(getAccommodationLoader);
  const { id, price, thumbnailUrl, address } = accommodationDetails;

  const combinedLocationText = `${address.city}, ${address.country}`;
  const locationText =
    address.city.length + address.country.length <= 40
      ? `${address.city}, ${address.country}`
      : `${combinedLocationText.substring(0, 24)}...`;

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.secondaryBackground }]}>
      <View style={styles.imageContainer}>
        {loader && <ActivityIndicator size="small" />}

        {!thumbnailUrl || thumbnailUrl === 'none' ? (
          <Icon name={IconName.Image} size={70} color="#b9b9b9" />
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
          <Text style={styles.city}>{locationText}</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>$</Text>
          <Text style={styles.price}>{price}</Text>
          <Text>/night</Text>
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

export default MyAccommodationListItem;
