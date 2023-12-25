import CountryPicker, {
  Country,
  DARK_THEME,
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';
import { useSelector } from 'react-redux';
import { getIsDarkMode } from 'src/store/selectors';

import { allowedCountries } from './CountryPicker.utils';

type Props = {
  onSelect: (country: Country) => void;
  onClose?: () => void;
  initialValue?: string;
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
      countryCodes={allowedCountries}
      withFlagButton={false}
    />
  );
};

export default CountrySelector;
