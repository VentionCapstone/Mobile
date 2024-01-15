import { TouchableOpacity, Text, View } from 'react-native';
import { GREY_300, TOMATO } from 'src/styles/colors';
import { IconName, IconSet } from 'src/types';

import { styles } from './Chip.styles';
import Icon from '../Icon/Icon';

type ChipProps = {
  iconName: IconName;
  iconSet: IconSet;
  onTouchFunction: () => void;
  text: string;
  state: boolean;
  index?: number;
};

const Chip = ({ iconName, iconSet, onTouchFunction, text, state, index }: ChipProps) => {
  return (
    <TouchableOpacity onPress={onTouchFunction}>
      <View style={styles.container}>
        <View style={state ? styles.chipAdded : styles.chip}>
          <Icon name={iconName} size={50} iconSet={iconSet} color={state ? TOMATO : GREY_300} />
          <Text style={state ? styles.chipFontFocused : styles.chipFont}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Chip;
