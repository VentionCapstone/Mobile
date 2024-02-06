import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Loader, MyAccommodationListItem, Text, showAlert } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import {
  getAccommodationLoader,
  getColors,
  getIsGuestAccount,
  getMyAccommodations,
  getMyAccommodationsLoader,
  getUserId,
} from 'src/store/selectors';
import { accommodationActions, myAccommodationsListActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { MyAccommodation } from 'src/types';

import { styles } from './MyAccommodations.style';

type Props = NativeStackScreenProps<RootStackParamList, 'MyAccommodations'>;

const MyAccommodations = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const myAccommodations = useSelector(getMyAccommodations);
  const isGuestAccount = useSelector(getIsGuestAccount);
  const accommodationLoader = useSelector(getAccommodationLoader);
  const myAccommodationsLoader = useSelector(getMyAccommodationsLoader);
  const userId = useSelector(getUserId);
  const colors = useSelector(getColors);
  const { t } = useTranslation();

  const [refreshing, setRefreshing] = useState(false);

  const filteredAccommodations = useMemo(
    () => myAccommodations?.filter((acc) => !acc.isDeleted) || [],
    [myAccommodations]
  );

  const handleEdit = (accommodation: MyAccommodation) => {
    navigation.navigate('UpdateAccommodation', { accommodation });
  };

  const handleDelete = async (accommodationId: string) => {
    showAlert('warning', {
      message: t('Are you sure to delete this accommodation?'),
      onOkPressed: async () => {
        await dispatch(AsyncThunks.deleteAccommodation(accommodationId));
      },
      onCancelPressed: () => {},
    });
  };

  const navigateToCreateAccount = () => {
    navigation.navigate('CreateProfile');
  };

  const fetchMyAccommodations = async () => {
    if (userId) {
      await dispatch(AsyncThunks.getMyAccommodations(userId));
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchMyAccommodations();
    setRefreshing(false);
  };

  const handleNavigateToDetails = (accommodationId: string) => {
    navigation.navigate('AccommodationDetails', { accommodationId });
  };

  useEffect(() => {
    dispatch(accommodationActions.clearError());
    dispatch(myAccommodationsListActions.clearError());
    fetchMyAccommodations();
  }, [dispatch]);

  return (
    <ScreenTemplate style={styles.container}>
      {isGuestAccount && (
        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccountTitle}>{t("You haven't created your account yet")}</Text>
          <Button title={t('Create Account')} onPress={navigateToCreateAccount} />
        </View>
      )}

      {!isGuestAccount && (
        <FlatList
          data={filteredAccommodations}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              progressBackgroundColor={colors.background}
              colors={[colors.tint]}
            />
          }
          ListEmptyComponent={() => (
            <Text style={styles.noAccommodationsText}>
              {t("You don't have any accommodations!")}
            </Text>
          )}
          renderItem={({ item }) => (
            <MyAccommodationListItem
              accommodationDetails={item}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onNavigate={() => handleNavigateToDetails(item.id)}
              loader={accommodationLoader}
            />
          )}
          contentContainerStyle={styles.flatlist}
        />
      )}

      <Loader visible={myAccommodationsLoader} message="Loading" />
    </ScreenTemplate>
  );
};

export default MyAccommodations;
