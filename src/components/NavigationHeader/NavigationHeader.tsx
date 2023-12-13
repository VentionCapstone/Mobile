import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';
import { IconName } from 'src/types/ui';

import { styles } from './NavigationHeader.style';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import ThemedView from '../ThemedView/ThemedView';

interface Props {
  leftComponent?: boolean;
  title?: string;
  rightComponent?: any;
}

const NavigationHeader = ({ leftComponent = true, title = '', rightComponent }: Props) => {
  const navigation = useNavigation();
  const colors = useSelector(getColors);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ThemedView style={[styles.container, { borderBottomColor: colors.border }]}>
      <View style={styles.leftContainer}>
        {leftComponent && (
          <TouchableOpacity onPress={handleBackPress}>
            <Icon name={IconName.BackChevron} size={30} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      {rightComponent ? <View style={styles.rightContainer}>{rightComponent}</View> : ''}
    </ThemedView>
  );
};

export default NavigationHeader;
