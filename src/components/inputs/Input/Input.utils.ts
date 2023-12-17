import { TextStyle, ViewStyle } from 'react-native';
import { PRIMARY_BLUE_200, RED_100, RED_200 } from 'src/styles';
import { ThemeColors } from 'src/types';

import { styles } from './Input.style';

type GetFontColorProps = {
  isFocused: boolean;
  error: string | undefined;
  colors: ThemeColors;
};

export const getFontColor = ({ isFocused, error, colors }: GetFontColorProps): string => {
  if (error) {
    return RED_100;
  } else if (isFocused) {
    return colors.text;
  } else {
    return colors.text;
  }
};

type GetTextInputStylesProps = {
  isFocused: boolean;
  error: string | undefined;
  colors: ThemeColors;
};

export const getTextInputStyles = ({
  isFocused,
  error,
  colors,
}: GetTextInputStylesProps): TextStyle => {
  const color = error ? RED_200 : colors.text;

  const inputStyles = {
    ...styles.input,
    color,
  };

  return inputStyles;
};

type GetBorderColorProps = {
  isFocused: boolean;
  error: string | undefined;
  colors: ThemeColors;
};

export const getBorderColor = ({ isFocused, error, colors }: GetBorderColorProps): string => {
  if (error) return RED_100;
  if (isFocused) return PRIMARY_BLUE_200;

  return colors.secondaryBackground;
};

type GetInputContainerStyles = {
  isFocused: boolean;
  error: string | undefined;
  colors: ThemeColors;
};

export const getInputContainerStyles = ({
  isFocused,
  error,
  colors,
}: GetInputContainerStyles): ViewStyle => {
  const borderColor = getBorderColor({ isFocused, error, colors });
  const backgroundColor = colors.secondaryBackground;

  const inputContainerStyles = {
    ...styles.inputContainer,
    borderColor,
    backgroundColor,
  };

  return inputContainerStyles;
};

type GetFontStyles = {
  isFocused: boolean;
  error: string | undefined;
  colors: ThemeColors;
};

export const getFontStyles = ({ isFocused, error, colors }: GetFontStyles): TextStyle => {
  const color = getFontColor({ isFocused, error, colors });

  if (error) return styles.errorText;

  const fontStyles = {
    ...styles.label,
    color,
  };

  return fontStyles;
};
