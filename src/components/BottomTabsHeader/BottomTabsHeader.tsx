import { Platform, SafeAreaView, StyleProp, View, ViewProps } from 'react-native';
import { ThemedView, Text } from 'src/components';

import { styles } from './BottomTabsHeader.styles';

interface BottomTabsHeaderProps {
  title: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewProps>;
  button?: React.ReactNode;
}

const BottomTabsHeader = ({ title, children, style, button }: BottomTabsHeaderProps) => {
  return (
    <ThemedView>
      <SafeAreaView style={{ marginTop: Platform.OS === 'android' ? 20 : undefined }}>
        <View style={[styles.container, style]}>
          <View style={styles.firstLine}>
            <Text style={styles.header}>{title}</Text>
            {button}
          </View>
          <Text style={styles.subtitle}>Find your perfect place</Text>
          <View>{children}</View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

export default BottomTabsHeader;
