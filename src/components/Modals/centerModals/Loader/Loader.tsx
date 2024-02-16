import { View, ActivityIndicator, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import Text from 'src/components/Text/Text';
import { getColors } from 'src/store/selectors';

import { styles } from './Loader.style';

type Props = {
  visible: boolean;
  message?: string;
  size?: 'large' | 'small';
};

const Loader = ({ visible = false, size = 'large', message }: Props) => {
  const colors = useSelector(getColors);

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={[styles.loaderContainer, { backgroundColor: colors.secondaryBackground }]}>
          <ActivityIndicator size={size} color={colors.tint} />
          <Text style={styles.loaderMessage}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
