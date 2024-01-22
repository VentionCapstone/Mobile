import { TextStyle, ViewStyle } from 'react-native';
import { BUTTON_SIZES } from 'src/styles';
import { ThemeColors } from 'src/types';

import { ButtonType } from './Button.types';

type GetBackgroundProps = {
  type: ButtonType;
  pressed?: boolean;
  disabled?: boolean;
  colors?: ThemeColors;
};

const getBackgroundColor = ({
  type,
  pressed,
  disabled,
  colors,
}: GetBackgroundProps): string | undefined => {
  switch (type) {
    case ButtonType.PRIMARY:
      if (pressed) return colors?.secondaryButtonBackground;
      if (disabled) return colors?.secondaryButtonBackground;
      return colors?.buttonBackground;
    case ButtonType.SECONDARY:
      return 'transparent';
    default:
      return 'transparent';
  }
};

type GetBorderColorProps = {
  type: ButtonType;
  pressed?: boolean;
  disabled?: boolean;
  colors?: ThemeColors;
};

const getBorderColor = ({
  type,
  pressed,
  colors,
  disabled,
}: GetBorderColorProps): string | undefined => {
  switch (type) {
    case ButtonType.PRIMARY:
      if (pressed) return colors?.secondaryButtonBackground;
      if (disabled) return colors?.secondaryBackground;
      return colors?.buttonBackground;
    case ButtonType.SECONDARY:
      if (pressed) return colors?.border;
      if (disabled) return colors?.border;
      return colors?.buttonBorder;
    case ButtonType.TERTIARY:
      return 'transparent';
    default:
      return 'transparent';
  }
};

type GetIconStylesProps = {
  size?: BUTTON_SIZES;
  type: ButtonType;
  disabled?: boolean;
  pressed?: boolean;
};

const getIconStyles = ({ type, disabled, pressed, size }: GetIconStylesProps): TextStyle => {
  const color = getFontColor({ type, disabled, pressed });

  switch (size) {
    case BUTTON_SIZES.SM:
      return { fontSize: 18 };
    case BUTTON_SIZES.MD:
      return { fontSize: 20 };
    case BUTTON_SIZES.LG:
      return { fontSize: 24 };
    default:
      break;
  }

  return {
    color,
  };
};

type GetFontColorProps = {
  type: ButtonType;
  disabled?: boolean;
  pressed?: boolean;
  colors?: ThemeColors;
};

const getFontColor = ({
  type,
  disabled,
  pressed,
  colors,
}: GetFontColorProps): string | undefined => {
  switch (type) {
    case ButtonType.PRIMARY:
      if (disabled) return colors?.secondaryButtonBackground;
      if (pressed) return colors?.secondaryButtonBackground;
      return colors?.buttonTextColor;

    case ButtonType.SECONDARY:
      if (disabled) return colors?.secondaryButtonBackground;
      if (pressed) return colors?.secondaryButtonBackground;
      return colors?.buttonTextColor;
    case ButtonType.TERTIARY:
      if (disabled) return colors?.secondaryButtonBackground;
      if (pressed) return colors?.secondaryButtonBackground;
      return colors?.buttonTextColor;
    default:
      break;
  }
  return colors?.buttonTextColor;
};

type GetFontStyleProps = {
  type: ButtonType;
  disabled?: boolean;
  pressed?: boolean;
  size?: BUTTON_SIZES;
  colors?: ThemeColors;
};

const getFontStyles = ({ type, pressed, disabled, size, colors }: GetFontStyleProps): TextStyle => {
  let fontSize = 16;

  if (pressed && size) {
    fontSize -= 2;
  }

  const color = getFontColor({ type, disabled, pressed, colors });

  switch (size) {
    case BUTTON_SIZES.SM:
      fontSize = 16;
      break;
    case BUTTON_SIZES.MD:
      fontSize = 18;
      break;
    case BUTTON_SIZES.LG:
      fontSize = 22;
      break;
    default:
      fontSize = 18;
  }

  const textColor = type === ButtonType.PRIMARY && colors?.background;

  return {
    fontSize,
    color: textColor || color,
  };
};

type GetButtonSizesProps = {
  size?: BUTTON_SIZES;
  pressed: boolean;
  width?: number;
  height?: number;
};

const getButtonSizes = ({ size, pressed, width, height }: GetButtonSizesProps): ViewStyle => {
  switch (size) {
    case BUTTON_SIZES.SM:
      return { width, height: height ? height : 40, paddingHorizontal: 16 };
    case BUTTON_SIZES.MD:
      return { width, height: height ? height : 48, paddingHorizontal: 24 };
    case BUTTON_SIZES.LG:
      return { width, height: height ? height : 56, paddingHorizontal: 32 };
    default:
      return {};
  }
};

type GetButtonStylesProps = {
  marginVertical?: number;
  disabled?: boolean;
  pressed: boolean;
  type: ButtonType;
  size?: BUTTON_SIZES;
  colors?: ThemeColors;
  width?: number;
  height?: number;
};

const getButtonStyles = ({
  marginVertical,
  disabled,
  pressed,
  type,
  size,
  width,
  height,
  colors,
}: GetButtonStylesProps): ViewStyle => {
  const backgroundColor = getBackgroundColor({ type, pressed, disabled, colors });
  const borderColor = getBorderColor({ type, pressed, disabled, colors });
  const buttonSizes = getButtonSizes({ size, pressed, width, height });

  const styles = {
    backgroundColor,
    borderColor,
    marginVertical,
    ...buttonSizes,
  };

  return styles;
};

export { getButtonStyles, getFontStyles, getFontColor, getIconStyles };
