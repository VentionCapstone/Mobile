import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Icon, Loader } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getColors, getHostProfile, getHostProfileLoader } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { WHITE_100, LEVEL_1 } from 'src/styles';
import { IconName } from 'src/types';

import HostAbout from './components/HostAbout';
import HostListings from './components/HostListings';
import HostMainCard from './components/HostMainCard';
import HostReviews from './components/HostReviews';
import HostVerifiedInfo from './components/HostVerifiedInfo';

type Props = NativeStackScreenProps<RootStackParamList, 'HostProfile'>;

const HostProfile = ({ route, navigation }: Props) => {
  const { hostId } = route.params;

  const host = useSelector(getHostProfile);
  const loading = useSelector(getHostProfileLoader);
  const dispatch = useAppDispatch();
  const colors = useSelector(getColors);

  const fetchHostProfile = useCallback(async () => {
    const response = await dispatch(AsyncThunks.getHostProfile(hostId));

    if (!response.payload?.success) {
      navigation.goBack();
    }
  }, [dispatch, hostId, navigation]);

  useEffect(() => {
    fetchHostProfile();
  }, [fetchHostProfile]);

  return (
    <ScreenTemplate>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchHostProfile}
            progressBackgroundColor={colors.background}
            colors={[colors.tint]}
          />
        }
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
            <Icon name={IconName.BackChevron} size={24} />
          </TouchableOpacity>
        </View>

        {host && host.id === hostId ? (
          <View>
            <HostMainCard host={host} />
            <HostAbout host={host} />
            <HostVerifiedInfo host={host} />
            <HostReviews host={host} />
            <HostListings host={host} navigation={navigation} />
          </View>
        ) : (
          <Loader visible={loading} message="Loading host profile" />
        )}
      </ScrollView>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  screen: {
    position: 'relative',
  },
  header: {
    width: '100%',
    height: 80,
    padding: 16,
    position: 'absolute',
    zIndex: 1,
    top: 32,
    left: 0,
    right: 0,
  },
  icon: {
    flexDirection: 'row',
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE_100,
    ...LEVEL_1,
  },
});

export default HostProfile;
