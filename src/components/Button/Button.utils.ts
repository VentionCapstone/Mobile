import { TextStyle, ViewStyle } from 'react-native';
import { FONT_SIZES, SIZES } from 'src/styles';
import { ThemeColorProps } from 'src/theme/types';

import { ButtonType } from './Button.types';

type GetBackgroundProps = {
  type: ButtonType;
  pressed?: boolean;
  disabled?: boolean;
  colors?: ThemeColorProps;
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
  colors?: ThemeColorProps;
};

const getBorderColor = ({
  type,
  pressed,
  disabled,
  colors,
}: GetBorderColorProps): string | undefined => {
  switch (type) {
    case ButtonType.PRIMARY:
      if (pressed) return colors?.secondaryButtonBackground;
      return colors?.buttonBackground;
    case ButtonType.SECONDARY:
      if (pressed) return colors?.border;
      return colors?.border;
    case ButtonType.TERTIARY:
      return 'transparent';
    default:
      return 'transparent';
  }
};

type GetIconStylesProps = {
  size?: SIZES;
  type: ButtonType;
  disabled?: boolean;
  pressed?: boolean;
};

const getIconStyles = ({ type, disabled, pressed, size }: GetIconStylesProps): TextStyle => {
  const color = getFontColor({ type, disabled, pressed });

  switch (size) {
    case SIZES.SM:
      return { fontSize: FONT_SIZES.MD };
    case SIZES.MD:
      return { fontSize: FONT_SIZES.LG };
    case SIZES.LG:
      return { fontSize: FONT_SIZES.XL };
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
  colors?: ThemeColorProps;
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
      return colors?.border;
    default:
      break;
  }
  return colors?.buttonTextColor;
};

type GetFontStyleProps = {
  type: ButtonType;
  disabled?: boolean;
  pressed?: boolean;
  size?: SIZES;
  colors?: ThemeColorProps;
};

const getFontStyles = ({ type, pressed, disabled, size, colors }: GetFontStyleProps): TextStyle => {
  let fontSize = FONT_SIZES.SM;

  if (pressed && size !== undefined) {
    fontSize -= 2;
  }

  const color = getFontColor({ type, disabled, pressed, colors });

  switch (size) {
    case SIZES.SM:
      fontSize = FONT_SIZES.SM;
      break;
    case SIZES.MD:
      fontSize = FONT_SIZES.MD;
      break;
    case SIZES.LG:
      fontSize = FONT_SIZES.LG;
      break;
    default:
      break;
  }

  const textColor = type === ButtonType.PRIMARY && colors?.background;

  return {
    fontSize,
    color: textColor || color,
  };
};

type GetButtonSizesProps = {
  size?: SIZES;
  pressed: boolean;
  width?: number;
  height?: number;
};

const getButtonSizes = ({ size, pressed, width, height }: GetButtonSizesProps): ViewStyle => {
  switch (size) {
    case SIZES.SM:
      return { width, height: height ? height : 40, paddingHorizontal: 16 };
    case SIZES.MD:
      return { width, height: height ? height : 48, paddingHorizontal: 24 };
    case SIZES.LG:
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
  size?: SIZES;
  colors?: ThemeColorProps;
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
