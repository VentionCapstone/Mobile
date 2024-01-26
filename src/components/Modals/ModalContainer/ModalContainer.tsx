import { ReactNode } from 'react';
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
      <View style={bottomModal ? styles.bottomModalContainer : styles.centralModalContainer}>
        <View
          style={[
            bottomModal ? styles.bottomModalContent : styles.modalContent,
            { backgroundColor: colors.background },
          ]}
        >
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: colors.background }]}
            onPress={onClose}
          >
            <Icon name={IconName.Close} size={30} color={colors.tint} />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalContainer;
