import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, View } from 'react-native';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import { RootStackParamList } from 'src/navigation';
import { useTheme } from 'src/theme';
import { NavigationListOption } from 'src/types/navigationList';
import { IconName } from 'src/types/ui';

import styles from './NavigationListItem.styles';

interface Props {
  item: NavigationListOption;
}

const NavigationListItem = ({ item }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { colors } = useTheme();

  const { onPress, screen, label, iconName, showIconRight = true } = item;

  return (
    <Pressable
      onPress={() => {
        if (onPress) onPress();
        navigation.navigate(screen as any);
      }}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed ? colors.secondaryBackground : colors.background,
        },
      ]}
    >
      <View style={styles.leftContainer}>
        {iconName && <Icon name={iconName} />}

        <Text style={[styles.label, { marginLeft: iconName ? 14 : 0 }]}>{label}</Text>
      </View>

      {showIconRight && <Icon name={IconName.ChevronForward} />}
    </Pressable>
  );
};

export default NavigationListItem;
