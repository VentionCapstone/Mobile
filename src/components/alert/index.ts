import { Alert } from 'react-native';

type AlertType = 'error' | 'success' | 'warning';

interface AlertOptions {
  title?: string;
  message: string;
  onOkPressed?: () => void;
  onCancelPressed?: () => void;
}

const showAlert = (type: AlertType, options: AlertOptions): void => {
  const { title, message, onOkPressed } = options;

  switch (type) {
    case 'error':
      Alert.alert(title || 'Error!', message, [{ text: 'OK', onPress: onOkPressed }]);
      break;
    case 'success':
      Alert.alert(title || 'Success!', message, [{ text: 'OK', onPress: onOkPressed }]);
      break;
    case 'warning':
      Alert.alert(title || 'Warning!', message, [{ text: 'OK', onPress: onOkPressed }]);
      break;
    default:
      break;
  }
};

export default showAlert;
