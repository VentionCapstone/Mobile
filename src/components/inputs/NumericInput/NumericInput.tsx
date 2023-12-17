import Input from '../Input/Input';

type Props = {
  label?: string;
  value: number | null;
  placeholder?: string;
  style?: any;
  error?: string;
  onChangeText: (value: any) => void;
};

const NumericInput = ({ label, value, placeholder, style, error, onChangeText }: Props) => {
  const handleTextChange = (text: string) => {
    const numericValue = parseFloat(text);

    onChangeText(isNaN(numericValue) ? null : numericValue);
  };

  return (
    <Input
      label={label}
      placeholder={placeholder || '0'}
      keyboardType="numeric"
      value={value !== null ? value.toString() : ''}
      onChangeText={handleTextChange}
      style={style}
      error={error}
    />
  );
};

export default NumericInput;
