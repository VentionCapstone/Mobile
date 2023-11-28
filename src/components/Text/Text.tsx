import { ReactNode } from 'react';
import { Text as DefaultText, TextStyle, TextProps, StyleProp } from 'react-native';
import { FONT_SIZES } from 'src/styles';
import { useTheme } from 'src/theme';

interface DefaultTextProps extends TextProps {
  children: ReactNode;
  color?: string;
  style?: StyleProp<TextStyle>;
}

const Text = ({ style, color, children, ...props }: DefaultTextProps) => {
  const { colors } = useTheme();

  const textColor = color ? color : colors.text;
  const textStyles: StyleProp<TextStyle>[] = [{ color: textColor, fontSize: FONT_SIZES.MD }, style];

  return (
    <DefaultText style={textStyles} {...props}>
      {children}
    </DefaultText>
  );
};

export default Text;
