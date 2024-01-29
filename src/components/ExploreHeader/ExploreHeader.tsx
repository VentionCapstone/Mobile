import { View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { getColors, getSearchParams } from 'src/store/selectors';
import { IconName } from 'src/types';

import { styles } from './ExploreHeader.styles';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

type Props = {
  onOpenSearchModal: () => void;
  onOpenFilterModal: () => void;
};

const ExploreHeader = ({ onOpenSearchModal, onOpenFilterModal }: Props) => {
  const colors = useSelector(getColors);
  const { location } = useSelector(getSearchParams);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onOpenSearchModal}
        style={[styles.searchBarInput, { backgroundColor: colors.background }]}
      >
        <Icon name={IconName.Search} size={26} />

        <View style={styles.searchContent}>
          <Text style={styles.searchHeader} ellipsizeMode="tail" numberOfLines={1}>
            {location ? location : 'Where to go?'}
          </Text>
          <Text>anywhere · week · 1 person</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onOpenFilterModal}
        style={[styles.filter, { backgroundColor: colors.background }]}
      >
        <Icon name={IconName.Options} size={26} />
      </TouchableOpacity>
    </View>
  );
};

export default ExploreHeader;
