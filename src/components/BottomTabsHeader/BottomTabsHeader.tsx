import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleProp, View, ViewProps } from 'react-native';
import { useSelector } from 'react-redux';
import { ThemedView, Text } from 'src/components';
import { getIsDarkMode } from 'src/store/selectors';
import { BLACK, WHITE } from 'src/styles';

import { styles } from './BottomTabsHeader.styles';

interface BottomTabsHeaderProps {
  title: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewProps>;
  button?: React.ReactNode;
}

const BottomTabsHeader = ({ title, children, style, button }: BottomTabsHeaderProps) => {
  const theme = useSelector(getIsDarkMode);
  return (
    <ThemedView>
      <SafeAreaView>
        <StatusBar backgroundColor={theme ? BLACK : WHITE} />
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
