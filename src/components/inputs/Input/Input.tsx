import React, { useRef } from 'react';
import { TextInput, TextInputProps, View, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';
import { RED_100 } from 'src/styles';
import { IconName } from 'src/types/ui';

import { styles } from './Input.style';
import { getInputContainerStyles, getTextInputStyles } from './Input.utils';
import Icon from '../../Icon/Icon';
import Text from '../../Text/Text';

type Props = TextInputProps & {
  label?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  error?: string;
  style?: ViewStyle | undefined;
  innerStyle?: TextInputProps;
};

const Input = ({ label, leftIcon, rightIcon, error, style, innerStyle, ...props }: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const colors = useSelector(getColors);
  const placeholderColor = error ? RED_100 : colors.placeholder;

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

        <View style={[getInputContainerStyles({ error, colors, isFocused }), style]}>
          {leftIcon && <Icon name={leftIcon} style={styles.leftIcon} iconSet="material" />}

          <TextInput
            ref={inputRef}
            style={[getTextInputStyles({ error, colors, isFocused }), innerStyle]}
            placeholderTextColor={placeholderColor}
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
