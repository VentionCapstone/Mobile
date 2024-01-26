import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import Icon from 'src/components/Icon/Icon';
import { RED_100, RED_200 } from 'src/styles';
import { IconName } from 'src/types';

import { styles } from './ErrorAlert.style';

interface Props {
  visible: boolean;
  message: string | undefined | string[];
  onClose: () => void;
}

const ErrorAlert = ({ visible, message, onClose }: Props) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const { t } = useTranslation();

  useEffect(() => {
    setModalVisible(visible);

    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <Modal transparent visible={modalVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name={IconName.Close} size={30} color={RED_100} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Icon name={IconName.Error} iconSet="material" size={22} color={RED_200} />
            <Text style={styles.title}>{t('Error occured!')}</Text>
          </View>

          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorAlert;
