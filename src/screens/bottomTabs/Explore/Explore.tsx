import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Card, ExploreHeader } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';

const Explore = () => {
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulating a delay for data fetching
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <>
      <ExploreHeader />
      <ScreenTemplate>
        <ScrollView
          style={{ padding: 15 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>
      </ScreenTemplate>
    </>
  );
};

export default Explore;
