import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import { RootStackParamList } from 'src/navigation';
import { getColors } from 'src/store/selectors';
import { NavigationListOption } from 'src/types/navigationList';
import { IconName } from 'src/types/ui';

import styles from './NavigationListItem.styles';

interface Props {
  item: NavigationListOption;
}

const NavigationListItem = ({ item }: Props) => {
  const colors = useSelector(getColors);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { onPress, screen, label, iconName, showIconRight = true } = item;

  const handlePress = () => {
    if (onPress) onPress();
    navigation.navigate(screen as any);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, { backgroundColor: colors.secondaryBackground }]}
    >
      <View style={styles.leftIconContainer}>{iconName && <Icon name={iconName} />}</View>

      <View style={styles.rightContainer}>
        <Text style={[styles.label, { marginLeft: iconName ? 14 : 0 }]}>{t(label)}</Text>
        {showIconRight && <Icon name={IconName.ChevronForward} />}
      </View>
    </TouchableOpacity>
  );
};

export default NavigationListItem;
