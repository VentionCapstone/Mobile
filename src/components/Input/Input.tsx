import React, { useRef } from 'react';
import { TextInput, TextInputProps, View, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'src/theme';
import { IconName } from 'src/types/ui';

import { styles } from './Input.style';
import { getFontColor, getInputWrapperStyles, getTextInputStyles } from './Input.utils';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

type Props = TextInputProps & {
  label?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  error?: string;
};

const Input = ({ label, leftIcon, rightIcon, error, ...props }: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const { colors } = useTheme();

  const inputRef = useRef<TextInput>(null);

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleOnBlur = () => {
    setIsFocused(false);
  };

  const handleContainerPress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleContainerPress}>
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View style={getInputWrapperStyles({ error, colors, isFocused })}>
          {leftIcon && <Icon name={leftIcon} style={styles.leftIcon} iconSet="material" />}

          <TextInput
            ref={inputRef}
            style={getTextInputStyles({ error, colors, isFocused })}
            placeholderTextColor={getFontColor({ error, colors, isFocused })}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            {...props}
          />

          {rightIcon && <Icon name={rightIcon} style={styles.rightIcon} size={22} />}
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Input;
