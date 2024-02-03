import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getColors, getHostProfile, getHostProfileLoader } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
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
        {host ? <Text>{host.firstName}</Text> : null}
      </ScrollView>
    </ScreenTemplate>
  );
};
export default HostProfile;
