import React, { ReactNode } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'src/components/Icon/Icon';
import { getColors } from 'src/store/selectors';
import { IconName } from 'src/types/ui';

import { styles } from './ModalContainer.style';

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
      {!bottomModal && (
        <View style={styles.centralModalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.secondaryBackground }]}>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.background }]}
              onPress={onClose}
            >
              <Icon name={IconName.Close} size={30} />
            </TouchableOpacity>
            {children}
          </View>
        </View>
      )}

      {bottomModal && (
        <View style={styles.bottomModalContainer}>
          <View style={[styles.bottomModalContent, { backgroundColor: colors.background }]}>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.background }]}
              onPress={onClose}
            >
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
