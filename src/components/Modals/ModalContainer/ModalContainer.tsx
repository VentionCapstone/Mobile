import React, { ReactNode } from 'react';
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'src/components/Icon/Icon';
import { GREY_400 } from 'src/styles';
import { IconName } from 'src/types/ui';

import { styles } from './ModalContainer.style';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';

interface ModalContainerProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  bottomModal?: boolean;
}

const ModalContainer = ({ visible, onClose, children, bottomModal }: ModalContainerProps) => {
  const colors = useSelector(getColors);

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onBlur={onClose}>
        <View />
      </TouchableWithoutFeedback>
      {!bottomModal && (
        <View style={styles.centralModalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.secondaryBackground }]}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name={IconName.Close} size={30} />
            </TouchableOpacity>
            {children}
          </View>
        </View>
      )}

      {bottomModal && (
        <View style={styles.bottomModalContainer}>
          <View
            style={[styles.bottomModalContent, { backgroundColor: colors.secondaryBackground }]}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name={IconName.Close} size={30} />
            </TouchableOpacity>
            {children}
          </View>
        </View>
      )}
    </Modal>
  );
};

export default ModalContainer;
