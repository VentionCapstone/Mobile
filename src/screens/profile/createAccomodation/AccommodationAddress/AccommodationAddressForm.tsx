import { Input } from 'src/components';
import { FormTemplate } from 'src/components/templates';
import { AddressValues } from 'src/types';
import { ADDRESS_INFO_MAX_LENGTH, ADDRESS_ZIPCODE_MAX_LENGTH } from 'src/utils';

type Props = {
  addressValues: AddressValues;
  onInputChange: (fieldName: keyof AddressValues, text: string) => void;
};

const AccommodationAddressForm = ({ addressValues, onInputChange }: Props) => {
  const handleInputChange = (fieldName: keyof AddressValues) => (text: string) => {
    onInputChange(fieldName, text);
  };

  return (
    <FormTemplate isButtonVisible={false}>
      <Input
        label="Country"
        placeholder="enter country"
        value={addressValues.country}
        maxLength={ADDRESS_INFO_MAX_LENGTH}
        onChangeText={handleInputChange('country')}
      />
      <Input
        label="City"
        placeholder="enter city"
        value={addressValues.city}
        maxLength={ADDRESS_INFO_MAX_LENGTH}
        onChangeText={handleInputChange('city')}
      />
      <Input
        label="Street"
        placeholder="enter street"
        value={addressValues.street}
        maxLength={ADDRESS_INFO_MAX_LENGTH}
        onChangeText={handleInputChange('street')}
      />
      <Input
        label="Zip code"
        placeholder="enter zip code"
        value={addressValues.zipCode}
        keyboardType="numeric"
        maxLength={ADDRESS_ZIPCODE_MAX_LENGTH}
        onChangeText={handleInputChange('zipCode')}
      />
    </FormTemplate>
  );
};

export default AccommodationAddressForm;
