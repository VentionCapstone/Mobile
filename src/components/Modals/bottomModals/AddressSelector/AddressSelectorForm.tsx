import { View } from 'react-native';
import { AddressValues, AddressValidationErrors } from 'src/types';
import { ADDRESS_INFO_MAX_LENGTH, ADDRESS_ZIPCODE_MAX_LENGTH } from 'src/utils';

import { styles } from './AddressSelector.style';
import Button from '../../../Button/Button';
import Input from '../../../inputs/Input/Input';

type Props = {
  validationErrors: AddressValidationErrors;
  formIsValid: boolean;
  onSave: () => void;
  addressValues: AddressValues;
  onInputChange: (fieldName: keyof AddressValues, text: string) => void;
};

const AddressSelectorForm = ({
  validationErrors,
  formIsValid,
  onSave,
  addressValues,
  onInputChange,
}: Props) => {
  const handleInputChange = (fieldName: keyof AddressValues) => (text: string) => {
    onInputChange(fieldName, text);
  };

  return (
    <View style={styles.addressContainer}>
      <Input
        label="Country"
        placeholder="enter country"
        value={addressValues.country}
        maxLength={ADDRESS_INFO_MAX_LENGTH}
        onChangeText={handleInputChange('country')}
        error={validationErrors.country}
      />
      <Input
        label="City"
        placeholder="enter city"
        value={addressValues.city}
        maxLength={ADDRESS_INFO_MAX_LENGTH}
        onChangeText={handleInputChange('city')}
        error={validationErrors.city}
      />
      <Input
        label="Street"
        placeholder="enter street"
        value={addressValues.street}
        maxLength={ADDRESS_INFO_MAX_LENGTH}
        onChangeText={handleInputChange('street')}
        error={validationErrors.street}
      />
      <Input
        label="Zip code"
        placeholder="enter zip code"
        value={addressValues.zipCode}
        keyboardType="numeric"
        maxLength={ADDRESS_ZIPCODE_MAX_LENGTH}
        onChangeText={handleInputChange('zipCode')}
        error={validationErrors.zipCode}
      />

      <Button
        title="Save"
        onPress={onSave}
        style={styles.saveButton}
        marginVertical={30}
        disabled={!formIsValid}
      />
    </View>
  );
};

export default AddressSelectorForm;
