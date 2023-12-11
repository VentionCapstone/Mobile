import { ReactNode } from 'react';
import { View as DefaultView, ViewStyle, StyleProp } from 'react-native';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';

type ViewProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  bgColor?: string;
};

const ThemedView = ({ children, style, bgColor }: ViewProps) => {
  const colors = useSelector(getColors);

  const viewStyles: StyleProp<ViewStyle>[] = [
    style,
    { backgroundColor: bgColor ? bgColor : colors.background },
  ];

  return <DefaultView style={viewStyles}>{children}</DefaultView>;
};

export default ThemedView;
