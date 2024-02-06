import { ReactNode } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import { getColors } from 'src/store/selectors';
import { ThemeColors } from 'src/types';
import { IconName } from 'src/types/ui';

import { styles } from './ModalContainer.style';

interface ModalContainerProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  bottomModal?: boolean;
  title?: string;
  bgColor?: ThemeColors;
}

const ModalContainer = ({
  visible,
  onClose,
  children,
  bottomModal,
  title,
  bgColor,
}: ModalContainerProps) => {
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
          <View style={styles.header}>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.background }]}
              onPress={onClose}
            >
              <Icon name={IconName.Close} size={30} />
            </TouchableOpacity>

            {title && <Text style={styles.title}>{title}</Text>}
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalContainer;
