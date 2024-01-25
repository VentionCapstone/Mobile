import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from 'src/navigation';
import { getColors } from 'src/store/selectors';
import { IconName } from 'src/types';

import { styles } from './ExploreHeader.styles';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import ThemedView from '../ThemedView/ThemedView';

type Props = {
  onOpenSearchModal: () => void;
};

const ExploreHeader = ({ onOpenSearchModal }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const colors = useSelector(getColors);

  const handleNavigateToFilter = () => {
    navigation.navigate('FilterModal');
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        onPress={onOpenSearchModal}
        style={[styles.searchBarInput, { backgroundColor: colors.background }]}
      >
        <Icon name={IconName.Search} size={26} />

        <View style={styles.searchContent}>
          <Text style={styles.searchHeader}>Where to go?</Text>
          <Text>anywhere · week · 1 person</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleNavigateToFilter}
        style={[styles.filter, { backgroundColor: colors.background }]}
      >
        <Icon name={IconName.Options} size={26} />
      </TouchableOpacity>
    </ThemedView>
  );
};

export default ExploreHeader;
