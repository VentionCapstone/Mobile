import React from 'react';
import { ScreenTemplate } from 'src/components/templates';
import { ExploreList } from 'src/screens/explore';

const Explore = () => {
  return (
    <ScreenTemplate>
      <ExploreList style={{ height: 800, padding: 10 }} />
    </ScreenTemplate>
  );
};

export default Explore;
