import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';
import { IconSet, IconName } from 'src/types/ui';

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  style?: ViewStyle;
  iconSet?: IconSet;
};

const Icon = ({ name, size = 24, color, style, iconSet = 'ionicons' }: IconProps) => {
  const colors = useSelector(getColors);

  const iconColor = color || colors.icon;

  switch (iconSet) {
    case 'ionicons':
      return <Ionicons name={name as any} size={size} color={iconColor} style={style} />;
    case 'material':
      return <MaterialIcons name={name as any} size={size} color={iconColor} style={style} />;
    default:
      return null;
  }
};

export default Icon;
