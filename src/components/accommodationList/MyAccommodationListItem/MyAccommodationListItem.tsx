import { Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import { getColors } from 'src/store/selectors';
import { GREY_300, RED_100 } from 'src/styles';
import { Accommodation, IconName } from 'src/types';

import { styles } from './MyAccommodationListItem.style';

type Props = {
  accommodationDetails: Accommodation;
  onEdit: (accommodationId: string) => void;
  onDelete: (accommodationId: string) => void;
};

const MyAccommodationListItem = ({ accommodationDetails, onDelete, onEdit }: Props) => {
  const colors = useSelector(getColors);

  const { id, price, thumbnailUrl } = accommodationDetails;
  const { city, country } = accommodationDetails.Address;

  return (
    <View style={[styles.card, { backgroundColor: colors.secondaryBackground }]}>
      <View style={styles.imageContainer}>
        {thumbnailUrl && (
          <Image
            source={{
              uri: thumbnailUrl,
            }}
            style={styles.thumbnail}
          />
        )}

        {!thumbnailUrl && <Icon name={IconName.Image} size={110} color={GREY_300} />}
      </View>
      <View style={styles.descriptionContainer}>
        <View style={styles.titleContainer}>
          <Icon name={IconName.Location} size={20} />
          <Text style={styles.location}>{`${city} ${country}`}</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>$</Text>
          <Text style={styles.price}>{price}</Text>
          <Text>/night</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(id)}>
            <Icon name={IconName.Edit} iconSet="material" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(id)}>
            <Icon name={IconName.Delete} iconSet="material" size={20} color={RED_100} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MyAccommodationListItem;
