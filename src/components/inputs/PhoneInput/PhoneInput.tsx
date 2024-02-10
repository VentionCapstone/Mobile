import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Country } from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-input';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';
import { PHONE_NUMBER_MAX_LENGTH } from 'src/utils';

import { styles } from './PhoneInput.style';
import { CountryPicker } from '../../Modals/bottomModals';
import Text from '../../Text/Text';

type Props = {
  label?: string;
  error?: string;
  onChangeText: (phoneNumber: string) => void;
  value: string;
};

const PhoneNumberInput = ({ label, error, onChangeText, value }: Props) => {
  const colors = useSelector(getColors);
  const phoneInputRef = useRef<PhoneInput>(null);
  const [initialCountry, setInitialCountry] = useState<string>('uz');
  const [countryCode, setCountryCode] = useState<string | null>();
  const [countrySelectorVisible, setCountrySelectorVisible] = useState<boolean>(false);

  const handleTextChange = (formattedNumber: string) => {
    onChangeText(formattedNumber);
  };

  const handleOnChangeCountry = useCallback(() => {
    if (countryCode) {
      setInitialCountry(countryCode);
    }
  }, [countryCode]);

  const handleOnCountrySelect = (country: Country) => {
    if (country.callingCode && phoneInputRef.current) {
      phoneInputRef.current.selectCountry(country.cca2.toLowerCase());
      setCountryCode(country.cca2.toLowerCase());
    }
  };

  useEffect(() => {
    const countryCode = phoneInputRef.current?.getISOCode();
    setCountryCode(countryCode);

    handleOnChangeCountry();
  }, [value, handleOnChangeCountry]);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <PhoneInput
        ref={phoneInputRef}
        style={[styles.phoneInputContainer, { backgroundColor: colors.secondaryBackground }]}
        flagStyle={styles.flagButton}
        textStyle={[styles.phoneInputText, { color: colors.text }]}
        initialCountry={initialCountry}
        initialValue={value}
        onChangePhoneNumber={handleTextChange}
        onSelectCountry={handleOnChangeCountry}
        onPressFlag={() => setCountrySelectorVisible(true)}
        textProps={{
          maxLength: PHONE_NUMBER_MAX_LENGTH,
          placeholder: 'Phone number',
          placeholderTextColor: colors.placeholder,
        }}
      />

      <CountryPicker
        visible={countrySelectorVisible}
        onClose={() => setCountrySelectorVisible(false)}
        onSelect={handleOnCountrySelect}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default PhoneNumberInput;
