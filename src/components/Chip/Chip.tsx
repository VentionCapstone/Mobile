import { TouchableOpacity, View } from 'react-native';
import { GREY_300, TOMATO } from 'src/styles/colors';
import { IconName, IconSet } from 'src/types';

import { styles } from './Chip.styles';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

type ChipProps = {
  iconName: IconName;
  iconSet: IconSet;
  onTouch: () => void;
  text: string;
  isToggled: boolean;
};

const Chip = ({ iconName, iconSet, onTouch, text, isToggled }: ChipProps) => {
  return (
    <TouchableOpacity onPress={onTouch}>
      <View style={styles.container}>
        <View style={[styles.chip, isToggled && styles.chipAdded]}>
          <Icon name={iconName} size={50} iconSet={iconSet} color={isToggled ? TOMATO : GREY_300} />
          <Text style={[styles.chipFont, isToggled && styles.chipFontFocused]}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Chip;
