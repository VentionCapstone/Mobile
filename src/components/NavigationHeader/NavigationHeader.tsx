import { useNavigation } from '@react-navigation/native';
import { ReactNode } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';
import { IconName } from 'src/types/ui';

import { styles } from './NavigationHeader.style';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import ThemedView from '../ThemedView/ThemedView';

interface Props {
  showBackButton?: boolean;
  title?: string;
  rightComponent?: ReactNode;
}

const NavigationHeader: React.FC<Props> = ({
  showBackButton = true,
  title = '',
  rightComponent,
}) => {
  const navigation = useNavigation();
  const colors = useSelector(getColors);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderBackButton = () => (
    <TouchableOpacity onPress={handleBackPress}>
      <Icon name={IconName.BackChevron} size={28} />
    </TouchableOpacity>
  );

  return (
    <ThemedView style={[styles.container, { borderBottomColor: colors.border }]}>
      <View style={styles.leftContainer}>
        <View style={styles.leftInnerContainer}>
          {showBackButton && renderBackButton()}
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      {rightComponent && <View style={styles.rightContainer}>{rightComponent}</View>}
    </ThemedView>
  );
};

export default NavigationHeader;
