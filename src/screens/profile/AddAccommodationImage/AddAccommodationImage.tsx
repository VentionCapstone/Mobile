import React from 'react';
import { Button } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';

const AddAccommodationImage = ({ route }: any) => {
  const { userId } = route.params;
  const handleSaveImage = () => {};

  return (
    <ScreenTemplate>
      <Button title="Save" onPress={handleSaveImage} />
    </ScreenTemplate>
  );
};

export default AddAccommodationImage;
