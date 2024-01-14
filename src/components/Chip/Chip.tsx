import { TouchableOpacity, Text, View } from 'react-native';
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
          <Icon name={iconName} size={24} iconSet={iconSet} color="grey" />
          <Text style={styles.chipFont}>{text}</Text>
        </View>
        <View>
          <Icon
            style={state ? styles.iconAdd : styles.iconRemove}
            name={state ? IconName.RemoveCircle : IconName.AddCircle}
            size={35}
            iconSet="ionicons"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Chip;
