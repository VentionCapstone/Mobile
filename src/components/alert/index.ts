import { Alert, AlertButton } from 'react-native';

type AlertType = 'error' | 'success' | 'warning';

interface AlertOptions {
  title?: string;
  message: string;
  onOkPressed?: () => void;
  onCancelPressed?: () => void;
}

const showAlert = (type: AlertType, options: AlertOptions): void => {
  const { title, message, onOkPressed, onCancelPressed } = options;

  const buttons: AlertButton[] = [{ text: 'OK', onPress: onOkPressed }];

  if (onCancelPressed) {
    buttons.push({ text: 'Cancel', onPress: onCancelPressed, style: 'cancel' });
  }

  switch (type) {
    case 'error':
      Alert.alert(title || 'Error!', message, buttons);
      break;
    case 'success':
      Alert.alert(title || 'Success!', message, buttons);
      break;
    case 'warning':
      Alert.alert(title || 'Warning!', message, buttons);
      break;
    default:
      break;
  }
};

export default showAlert;
