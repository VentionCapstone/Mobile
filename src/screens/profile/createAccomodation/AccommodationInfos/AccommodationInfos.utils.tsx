import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Text from 'src/components/Text/Text';
import { getColors } from 'src/store/selectors';

import { styles } from './AccommodationInfos.style';

interface Props {
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const CounterButton = ({ onPress, children, disabled }: Props) => {
  const colors = useSelector(getColors);
  return (
    <TouchableOpacity
      style={[styles.counterButton, { backgroundColor: colors.secondaryBackground }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.counterText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default CounterButton;
