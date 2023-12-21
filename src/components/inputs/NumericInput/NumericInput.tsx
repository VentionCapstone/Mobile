import { ViewStyle } from 'react-native';

import Input from '../Input/Input';

type Props = {
  label?: string;
  value: number | null;
  placeholder?: string;
  error?: string;
  onChangeText: (value: number | null) => void;
  maxLength?: number;
  style?: ViewStyle | undefined;
};

const NumericInput = ({
  label,
  value,
  placeholder,
  style,
  error,
  onChangeText,
  maxLength,
}: Props) => {
  const handleTextChange = (text: string) => {
    const numericValue = parseFloat(text);

    onChangeText(isNaN(numericValue) ? null : numericValue);
  };

  return (
    <Input
      label={label}
      placeholder={placeholder || '0'}
      keyboardType="numeric"
      maxLength={maxLength}
      value={value !== null ? value.toString() : ''}
      onChangeText={handleTextChange}
      style={style}
      error={error}
    />
  );
};

export default NumericInput;
