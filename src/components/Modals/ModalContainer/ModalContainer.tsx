import React, { ReactNode } from 'react';
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'src/components/Icon/Icon';
import { GREY_400 } from 'src/styles';
import { IconName } from 'src/types/ui';

import { styles } from './ModalContainer.style';

interface ModalContainerProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalContainer = ({ visible, onClose, children }: ModalContainerProps) => {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onBlur={onClose}>
        <View />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name={IconName.Close} size={30} color={GREY_400} />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalContainer;
