import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect } from 'react';
import { RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getColors, getHostProfile, getHostProfileLoader } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { IconName } from 'src/types';

import styles from './HostProfile.styles';
import HostAbout from './components/HostAbout/HostAbout';
import HostListings from './components/HostListings/HostListings';
import HostMainCard from './components/HostMainCard/HostMainCard';
import HostReviews from './components/HostReviews/HostReviews';
import HostVerifiedInfo from './components/HostVerifiedInfo/HostVerifiedInfo';

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
    <ScreenTemplate headerShown={false}>
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
        <TouchableOpacity
          style={[styles.icon, { backgroundColor: colors.secondaryBackground }]}
          onPress={() => navigation.goBack()}
        >
          <Icon name={IconName.BackChevron} />
        </TouchableOpacity>

        {host && (
          <View>
            <HostMainCard host={host} />
            <HostAbout host={host} />
            <HostVerifiedInfo host={host} />
            {host?.reviews.count !== 0 && <HostReviews host={host} />}
            {host.accommodations && <HostListings host={host} />}
          </View>
        )}
      </ScrollView>
    </ScreenTemplate>
  );
};

export default HostProfile;
