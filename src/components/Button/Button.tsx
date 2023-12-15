import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';
import { BUTTON_SIZES, WHITE_200 } from 'src/styles';
import { IconName } from 'src/types/ui';

import styles from './Button.styles';
import { ButtonType } from './Button.types';
import { getButtonStyles, getFontStyles, getIconStyles } from './Button.utils';
import Icon from '../Icon/Icon';

interface Props {
  disabled?: boolean;
  isLoading?: boolean;
  leftIcon?: IconName;
  onPress: () => void;
  marginVertical?: number;
  title: string;
  type?: ButtonType;
  size?: BUTTON_SIZES;
  width?: number | string;
  height?: number;
  style?: any;
}

const Button = ({
  isLoading,
  disabled,
  leftIcon,
  marginVertical,
  onPress,
  title,
  type = ButtonType.PRIMARY,
  size = BUTTON_SIZES.MD,
  width,
  height,
  style,
}: Props) => {
  const colors = useSelector(getColors);

  const handlePress = () => {
    if (disabled || isLoading) return;
    onPress();
  };

  return (
    <>
      <Pressable
        onPress={handlePress}
        disabled={disabled || isLoading}
        style={({ pressed }) => {
          const buttonStyles = getButtonStyles({
            marginVertical,
            pressed,
            disabled,
            type,
            size,
            colors,
            height,
          });

          return [styles.pressable, buttonStyles, style, { width: width || 'auto' }];
        }}
      >
        {({ pressed }) => (
          <>
            {isLoading && <ActivityIndicator size="small" color={WHITE_200} />}

            {!isLoading && !leftIcon && (
              <Text style={getFontStyles({ pressed, disabled, type, size, colors })}>{title}</Text>
            )}

            {!isLoading && leftIcon && (
              <View style={styles.iconContainer}>
                <Icon
                  name={leftIcon}
                  style={getIconStyles({ type, disabled, pressed, size })}
                  color={colors.icon}
                />
                <Text style={getFontStyles({ pressed, disabled, type, size, colors })}>
                  {title}
                </Text>
              </View>
            )}
          </>
        )}
      </Pressable>
    </>
  );
};

export default Button;
