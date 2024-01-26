import { View } from 'react-native';
import { Button, ButtonType } from 'src/components/Button';
import { BUTTON_SIZES } from 'src/styles';
import { SortOrder } from 'src/types';

import { styles } from './FilterModal.styles';

type Props = {
  orderState: SortOrder;
  setOrderState: React.Dispatch<React.SetStateAction<SortOrder>>;
};

const FilterOrderButtons = ({ orderState, setOrderState }: Props) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title="Asc"
        size={BUTTON_SIZES.SM}
        type={orderState === SortOrder.ASC ? ButtonType.PRIMARY : ButtonType.SECONDARY}
        onPress={() => setOrderState(SortOrder.ASC)}
      />
      <Button
        title="Desc"
        size={BUTTON_SIZES.SM}
        type={orderState === SortOrder.DESC ? ButtonType.PRIMARY : ButtonType.SECONDARY}
        onPress={() => setOrderState(SortOrder.DESC)}
      />
    </View>
  );
};

export default FilterOrderButtons;
