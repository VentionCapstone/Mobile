import React from 'react';
import { View } from 'react-native';
import { ExploreHeader } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { ExploreList } from 'src/screens/explore';

const Explore = () => {
  return (
    <ScreenTemplate>
      <ExploreHeader />
      <ExploreList style={{ height: 800, padding: 10 }} />
    </ScreenTemplate>
  );
};

export default Explore;
