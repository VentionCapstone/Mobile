import CountryPicker, {
  Country,
  DARK_THEME,
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';
import { useSelector } from 'react-redux';
import { getIsDarkMode } from 'src/store/selectors';

import { ALLOWED_COUNTRIES } from './CountryPicker.utils';

type Props = {
  onSelect: (country: Country) => void;
  onClose?: () => void;
  visible: boolean;
};

const CountrySelector = ({ onSelect, visible, onClose }: Props) => {
  const isDark = useSelector(getIsDarkMode);

  const handleCountrySelect = (country: Country) => {
    onSelect(country);
  };

  return (
    <CountryPicker
      withFilter
      countryCode="UZ"
      onSelect={(country) => handleCountrySelect(country)}
      onClose={onClose}
      visible={visible}
      theme={isDark ? DARK_THEME : DEFAULT_THEME}
      countryCodes={ALLOWED_COUNTRIES}
      withFlagButton={false}
    />
  );
};

export default CountrySelector;
