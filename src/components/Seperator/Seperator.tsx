import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { getColors } from 'src/store/selectors';

import { styles } from './Seperator.style';

const Seperator = () => {
  const colors = useSelector(getColors);

  return <View style={[styles.container, { backgroundColor: colors.border }]} />;
};

export default Seperator;
