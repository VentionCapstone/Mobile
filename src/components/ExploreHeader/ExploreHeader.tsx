import { useTranslation } from 'react-i18next';
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
  const searchParams = useSelector(getSearchParams);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onOpenSearchModal}
        style={[styles.searchBarInput, { backgroundColor: colors.background }]}
      >
        <Icon name={IconName.Search} size={26} />

        <View style={styles.searchContent}>
          <Text style={styles.searchHeader} ellipsizeMode="tail" numberOfLines={1}>
            {searchParams?.location ? searchParams?.location : t('Where to go?')}
          </Text>
          <Text>
            {t('Anywhere')} · {t('week')} · 1 {t('person')}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onOpenFilterModal}
        style={[styles.filter, { backgroundColor: colors.background }]}
      >
        <Icon name={IconName.Options} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default ExploreHeader;
