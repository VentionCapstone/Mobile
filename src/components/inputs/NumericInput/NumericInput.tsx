import Input from '../Input/Input';

type Props = {
  label?: string;
  value: number;
  placeholder?: string;
  style?: any;
  error?: string;
  onChangeText: (value: number) => void;
};

const NumericInput = ({ label, value, placeholder, style, error, onChangeText }: Props) => {
  const handleTextChange = (text: string) => {
    const numericValue = parseFloat(text);
    onChangeText(isNaN(numericValue) ? 0 : numericValue);
  };

  return (
    <Input
      label={label}
      placeholder={placeholder}
      keyboardType="numeric"
      value={value.toString()}
      onChangeText={handleTextChange}
      style={style}
      error={error}
    />
  );
};

export default NumericInput;
