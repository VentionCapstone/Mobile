import { ReactNode, useEffect, useRef, useState } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';

import { styles } from './Collapsable.styles';
import Text from '../Text/Text';

type Props = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  contentTitle: string;
  isCollapsed?: boolean;
};

const Collapsable = ({ children, title, subtitle, contentTitle, isCollapsed = true }: Props) => {
  const colors = useSelector(getColors);
  const fadeAnimHeader = useRef(new Animated.Value(1)).current;
  const fadeAnimContent = useRef(new Animated.Value(0)).current;
  const [collapsed, setCollapsed] = useState<boolean>(isCollapsed);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnimHeader, {
        toValue: collapsed ? 1 : 0.7,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimContent, {
        toValue: collapsed ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [collapsed, fadeAnimHeader, fadeAnimContent]);

  return (
    <View style={styles.container}>
      {collapsed && (
        <Animated.View style={{ opacity: fadeAnimHeader }}>
          <TouchableOpacity
            onPress={handleCollapse}
            style={[styles.card, { backgroundColor: colors.background }]}
          >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {!collapsed && (
        <Animated.View style={{ opacity: fadeAnimContent }}>
          <TouchableOpacity
            onPress={handleCollapse}
            style={[
              styles.card,
              {
                flexDirection: 'column',
                alignItems: 'flex-start',
                backgroundColor: colors.background,
              },
            ]}
          >
            <Text style={styles.contentTitle}>{contentTitle}</Text>

            {children}
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default Collapsable;
