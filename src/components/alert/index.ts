import Toast, { ToastType } from 'react-native-toast-message';

type ToastProps = {
  type?: ToastType;
  text1?: string;
  text2?: string;
};

const showToast = ({ type = 'success', text1, text2 }: ToastProps): void => {
  Toast.show({
    type,
    text1,
    text2,
    swipeable: true,
    visibilityTime: 3000,
  });
};

export default showToast;
