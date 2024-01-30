import { View } from 'react-native';
import { Button, ButtonType } from 'src/components/Button';
import { BUTTON_SIZES } from 'src/styles';
import { SortOrder } from 'src/types';

import { styles } from './FilterModal.styles';

type Props = {
  onOrderStateChange: (order: SortOrder | null) => void;
  orderState?: SortOrder | null;
};

const FilterOrderButtons = ({ onOrderStateChange, orderState }: Props) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title="Any"
        size={BUTTON_SIZES.SM}
        type={orderState === null ? ButtonType.PRIMARY : ButtonType.SECONDARY}
        onPress={() => onOrderStateChange(null)}
      />
      <Button
        title="Asc"
        size={BUTTON_SIZES.SM}
        type={orderState === SortOrder.ASC ? ButtonType.PRIMARY : ButtonType.SECONDARY}
        onPress={() => onOrderStateChange(SortOrder.ASC)}
      />
      <Button
        title="Desc"
        size={BUTTON_SIZES.SM}
        type={orderState === SortOrder.DESC ? ButtonType.PRIMARY : ButtonType.SECONDARY}
        onPress={() => onOrderStateChange(SortOrder.DESC)}
      />
    </View>
  );
};

export default FilterOrderButtons;
