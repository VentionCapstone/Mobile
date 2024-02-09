import { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'src/components/Icon/Icon';
import { getColors } from 'src/store/selectors';
import { AlertType, IconName } from 'src/types';

import { styles } from './Alert.style';

interface Props {
  visible: boolean;
  title?: string;
  message?: string | undefined | string[];
  onClose: () => void;
  type?: AlertType;
}

const Alert = ({ visible, title, message, onClose, type = AlertType.Error }: Props) => {
  const colors = useSelector(getColors);
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    setModalVisible(visible);

    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  const modalContentStyles = {
    backgroundColor: colors.background,
    borderBottomColor: type === AlertType.Error ? colors.error : colors.success,
  };

  const iconContainerStyles = {
    backgroundColor: type === AlertType.Error ? colors.errorBackground : colors.successBackground,
  };

  const alertIcon = type === AlertType.Error ? IconName.Error : IconName.Check;
  const iconColor = type === AlertType.Error ? colors.error : colors.success;

  return (
    <Modal transparent visible={modalVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, modalContentStyles]}>
          <View style={styles.messageContainer}>
            <View style={[styles.iconContainer, iconContainerStyles]}>
              <Icon
                size={20}
                name={alertIcon}
                color={iconColor}
                iconSet={type === AlertType.Error ? 'material' : 'ionicons'}
              />
            </View>

            <View>
              <Text style={styles.title}>
                {title || (type === AlertType.Error ? 'Error Occurred!' : 'Success!')}
              </Text>
              {message && <Text style={styles.message}>{message}</Text>}
            </View>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name={IconName.CloseOutline} size={26} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Alert;
