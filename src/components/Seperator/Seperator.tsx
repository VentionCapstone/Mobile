import { View } from 'react-native';
import { useTheme } from 'src/theme';

import { styles } from './Seperator.style';

const Seperator = () => {
  const { colors } = useTheme();

  return <View style={[styles.seperator, { backgroundColor: colors.border }]} />;
};

export default Seperator;
