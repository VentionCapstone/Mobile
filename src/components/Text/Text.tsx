import { ReactNode } from 'react';
import { Text as DefaultText, StyleProp, TextProps, TextStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';

interface DefaultTextProps extends TextProps {
  children: ReactNode;
  color?: string | undefined;
  style?: StyleProp<TextStyle>;
}

const Text = ({ color, children, style, ...props }: DefaultTextProps) => {
  const colors = useSelector(getColors);
  const textStyles = [{ color: color ? color : colors.text }, style];

  return (
    <DefaultText style={textStyles} {...props}>
      {children}
    </DefaultText>
  );
};

export default Text;
