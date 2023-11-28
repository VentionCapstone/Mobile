import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { WHITE_200 } from 'src/styles';
import { SIZES } from 'src/styles/containers';
import { useTheme } from 'src/theme';
import { IconName } from 'src/types/ui';

import styles from './Button.styles';
import { ButtonType } from './Button.types';
import { getButtonStyles, getFontColor, getFontStyles, getIconStyles } from './Button.utils';
import Icon from '../Icon/Icon';

interface Props {
  disabled?: boolean;
  isLoading?: boolean;
  leftIcon?: IconName;
  onPress: () => void;
  marginVertical?: number;
  title: string;
  type?: ButtonType;
  size?: SIZES;
  width?: number;
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
  size = SIZES.MD,
  width,
  height,
  style,
}: Props) => {
  const { colors } = useTheme();
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
            width,
            height,
          });

          return [styles.pressable, buttonStyles, style, { width: width && '100%' }];
        }}
      >
        {({ pressed }) => (
          <>
            {isLoading && <ActivityIndicator size="small" color={WHITE_200} />}

            {!isLoading && !leftIcon && (
              <Text style={getFontStyles({ pressed, disabled, type, size, colors })}>{title}</Text>
            )}

            {!isLoading && leftIcon && (
              <View style={styles.iconWrapper}>
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
