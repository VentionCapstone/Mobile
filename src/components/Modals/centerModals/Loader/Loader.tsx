import React from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';

import { styles } from './Loader.style';

type Props = {
  visible: boolean;
  size?: 'large' | 'small';
};

const Loader = ({ visible, size = 'large' }: Props) => {
  const colors = useSelector(getColors);

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={size} color={colors.tint} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
