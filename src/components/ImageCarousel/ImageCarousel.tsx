import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
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

const styles = StyleSheet.create({
  wrapper: { height: 250 },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dotStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  activeDotStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

export default ImageCarousel;
