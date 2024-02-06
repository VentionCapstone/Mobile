import { useTranslation } from 'react-i18next';
import { Input } from 'src/components';
import { FormTemplate } from 'src/components/templates';
import { AddressValues } from 'src/types';
import { ADDRESS_INFO_MAX_LENGTH, ADDRESS_ZIPCODE_MAX_LENGTH } from 'src/utils';

type Props = {
  addressValues: AddressValues;
  onInputChange: (fieldName: keyof AddressValues, text: string) => void;
};

const AccommodationAddressForm = ({ addressValues, onInputChange }: Props) => {
  const { t } = useTranslation();

  const handleInputChange = (fieldName: keyof AddressValues) => (text: string) => {
    onInputChange(fieldName, text);
  };

  return (
    <FormTemplate isButtonVisible={false}>
      <Input
        label={t('Country')}
        placeholder={t('enter country')}
        value={addressValues.country}
        maxLength={ADDRESS_INFO_MAX_LENGTH}
        onChangeText={handleInputChange('country')}
      />
      <Input
        label={t('City')}
        placeholder={t('enter city')}
        value={addressValues.city}
        maxLength={ADDRESS_INFO_MAX_LENGTH}
        onChangeText={handleInputChange('city')}
      />
      <Input
        label={t('Street')}
        placeholder={t('enter street')}
        value={addressValues.street}
        maxLength={ADDRESS_INFO_MAX_LENGTH}
        onChangeText={handleInputChange('street')}
      />
      <Input
        label={t('Zip code')}
        placeholder={t('enter zip code')}
        value={addressValues.zipCode}
        keyboardType="numeric"
        maxLength={ADDRESS_ZIPCODE_MAX_LENGTH}
        onChangeText={handleInputChange('zipCode')}
      />
    </FormTemplate>
  );
};

export default AccommodationAddressForm;
