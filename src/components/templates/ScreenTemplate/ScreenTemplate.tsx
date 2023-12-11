import { View } from 'react-native';
import ThemedView from 'src/components/ThemedView/ThemedView';
import { Style } from 'src/styles/ui';

import styles from './ScreenTemplate.styles';

interface Props {
  children: React.ReactNode;
  headerShown?: boolean;
  style?: Style;
}

const ScreenTemplate = ({ children, headerShown = true, style }: Props) => {
  return (
    <ThemedView style={[styles.screenContainer, style]}>
      {!headerShown && <View style={styles.screenInnerContainer}>{children}</View>}
      {headerShown && children}
    </ThemedView>
  );
};

export default ScreenTemplate;
