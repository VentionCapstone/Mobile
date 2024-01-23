import React, { ReactNode, useEffect, useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Text from 'src/components/Text/Text';
import { getIsDarkMode } from 'src/store/selectors';
import { LEVEL_1, WHITE } from 'src/styles';

import { styles } from './Collapsable.styles';
import ThemedView from '../ThemedView/ThemedView';

type CollapsableProps = {
  collapsed: boolean;
  onTouch: () => void;
  children: ReactNode;
  title: string;
  subtitle: string;
  contentTitle: string;
};

const Collapsable = ({
  children,
  title,
  subtitle,
  collapsed,
  contentTitle,
  onTouch,
}: CollapsableProps) => {
  const colors = useSelector(getIsDarkMode);
  const fadeAnimHeader = useRef(new Animated.Value(1)).current;
  const fadeAnimContent = useRef(new Animated.Value(0)).current;

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
    <>
      {collapsed && (
        <Animated.View
          style={{
            opacity: fadeAnimHeader,
          }}
        >
          <TouchableOpacity onPress={onTouch}>
            <ThemedView
              style={[styles.card, styles.cardHeader, LEVEL_1, colors && { shadowColor: WHITE }]}
            >
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </ThemedView>
          </TouchableOpacity>
        </Animated.View>
      )}
      {!collapsed && (
        <Animated.View
          style={{
            opacity: fadeAnimContent,
          }}
        >
          <ThemedView
            style={[styles.card, styles.cardBody, LEVEL_1, colors && { shadowColor: WHITE }]}
          >
            <TouchableOpacity onPress={onTouch}>
              <Text style={styles.contentTitle}>{contentTitle}</Text>
            </TouchableOpacity>
            {children}
          </ThemedView>
        </Animated.View>
      )}
    </>
  );
};

export default Collapsable;
