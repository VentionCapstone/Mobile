import dayjs from 'dayjs';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { useSelector } from 'react-redux';
import { Text } from 'src/components';
import { getColors } from 'src/store/selectors';
import { HostProfile } from 'src/types';

import styles from './HostReviews.styles';

interface Props {
  host: HostProfile;
}
const HostReviews = ({ host }: Props) => {
  const colors = useSelector(getColors);
  const { firstName, joinedAt, reviews } = host;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`${firstName}'s latest reviews`}</Text>
      </View>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        activeDotColor={colors.icon}
        paginationStyle={styles.dotContainer}
      >
        {reviews.list?.map((review, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.reviewContainer}>
              <View style={styles.reviewContent}>
                <Text numberOfLines={4} style={styles.reviewText}>
                  {review.feedback}
                </Text>
              </View>
              <View style={styles.userInfoContainer}>
                <Image source={{ uri: review.user.profile.imageUrl }} style={styles.userImage} />
                <View style={styles.userInfoText}>
                  <Text
                    style={styles.userName}
                  >{`${review.user.firstName} ${review.user.lastName}`}</Text>
                  <Text style={styles.joinedDate}>{dayjs(joinedAt).format('MMM YYYY')}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default HostReviews;
