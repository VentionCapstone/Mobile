import { useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import { getColors } from 'src/store/selectors';
import { RED_200 } from 'src/styles';
import { IconName, Wishlist } from 'src/types';

import { styles } from './WishlistItem.style';

type Props = {
  onNavigateToAccommodationDetails: (accommodationId: string) => void;
  wishlistDetails: Wishlist;
  onDelete: () => void;
};

const WishlistItem = ({ onNavigateToAccommodationDetails, wishlistDetails, onDelete }: Props) => {
  const colors = useSelector(getColors);
  const [imageLoading, setImageLoading] = useState(true);

  const { accommodation } = wishlistDetails;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.secondaryBackground }]}
      onPress={() => onNavigateToAccommodationDetails(accommodation.id)}
    >
      <TouchableOpacity style={styles.likeButton} onPress={onDelete}>
        <Icon name={IconName.Heart} size={30} color={RED_200} />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {imageLoading && (
          <ActivityIndicator style={styles.imageLoader} size="large" color={RED_200} />
        )}

        <Image
          style={styles.image}
          source={{ uri: accommodation.thumbnailUrl }}
          onLoad={() => setImageLoading(false)}
        />
      </View>

      <View style={styles.wishlistInfos}>
        <View>
          <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
            {`${accommodation.address.country}, ${accommodation.address.city}`}
          </Text>

          <Text style={[styles.price, { color: RED_200 }]}>${accommodation.price}</Text>
        </View>

        <Text style={styles.baseInfos}>
          {`${accommodation.numberOfRooms} guests, ${accommodation.squareMeters}m2`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default WishlistItem;
