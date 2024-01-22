import React from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import Text from 'src/components/Text/Text';
import { getColors } from 'src/store/selectors';

import { styles } from './Loader.style';

type Props = {
  visible: boolean;
  size?: 'large' | 'small';
  message?: string;
};

const Loader = ({ visible, size = 'large', message }: Props) => {
  const colors = useSelector(getColors);

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={size} color={colors.tint} />
          <Text style={[styles.loaderMessage, { color: colors.border }]}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
