import React, { useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { Card, ExploreHeader } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { ExploreList } from 'src/screens/explore';

const Explore = () => {
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulating a delay for data fetching
  };

  return (
    <ScreenTemplate>
      <ExploreHeader />
      <View>
        <View style={{ padding: 15 }}>
          <ExploreList />
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default Explore;
