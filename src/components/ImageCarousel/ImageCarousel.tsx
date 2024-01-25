import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

import { styles } from './ImageCarousel.style';

interface Props {
  images: string[];
}

const ImageCarousel = ({ images }: Props) => {
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      autoplay
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
    >
      {images.map((imageUrl, index) => (
        <View key={index} style={styles.slide}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
