import dayjs from 'dayjs';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { useSelector } from 'react-redux';
import { Text } from 'src/components';
import { getColors } from 'src/store/selectors';
import { paragraph2, paragraph1, subtitle1, GREY_200 } from 'src/styles';
import { HostProfile } from 'src/types';

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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    marginBottom: 20,
  },
  wrapper: {
    height: 210,
  },
  slide: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    bottom: -20,
  },
  titleContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  title: {
    ...subtitle1,
    fontWeight: 'bold',
  },
  reviewContainer: {
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: GREY_200,
    padding: 20,
  },
  reviewContent: {
    marginBottom: 15,
  },
  reviewText: {
    ...paragraph1,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfoText: {
    flexDirection: 'column',
  },
  userName: {
    ...paragraph1,
    fontWeight: 'bold',
  },
  joinedDate: {
    ...paragraph2,
  },
});

export default HostReviews;
