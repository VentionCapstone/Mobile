import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  NavigationList,
  ProfileFooter,
  ProfileHeader,
  Text,
  showAlert,
} from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { AppDispatch } from 'src/store';
import {
  getAccommodationError,
  getAccountError,
  getColors,
  getIsGuestAccount,
  getIsLoggedIn,
  getMyAccommodationsError,
  getUserId,
} from 'src/store/selectors';
import {
  accommodationActions,
  accountActions,
  myAccommodationsListActions,
  userActions,
} from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { ApiSuccessResponseType, User } from 'src/types';

import { ACCOUNT_SECTIONS, AIR_BNB_IMAGE_URL } from './Profile.constants';
import styles from './Profile.style';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({ navigation }: Props) => {
  const userId = useSelector(getUserId);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isGuestAccount = useSelector(getIsGuestAccount);
  const userError = useSelector(getAccountError);
  const accommodationError = useSelector(getAccommodationError);
  const myAccommodationsError = useSelector(getMyAccommodationsError);
  const colors = useSelector(getColors);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleLogOut = async () => {
    showAlert('warning', {
      message: t('Are you sure you want to log out?'),
      onOkPressed: async () => {
        const response = await dispatch(AsyncThunks.signOut());

        if (response?.meta.requestStatus === 'fulfilled') {
          dispatch(accountActions.reset());
          dispatch(accommodationActions.reset());
          dispatch(myAccommodationsListActions.reset());
          dispatch(userActions.reset());
        }
      },
      onCancelPressed: () => {},
    });
  };

  const getAccountDetails = useCallback(async () => {
    if (!userId) return;
    const user = await dispatch(AsyncThunks.getUserDetails(userId));

    const userProfile = (user.payload as ApiSuccessResponseType<User>).data.profile;

    if (userProfile) {
      const profileId = userProfile.id;
      await dispatch(AsyncThunks.getAccountDetails(profileId));
    }
  }, [dispatch, userId]);

  const handleRefresh = async () => {
    if (isGuestAccount) return;

    setRefreshing(true);
    await getAccountDetails();
    setRefreshing(false);
  };

  const navigateToCreateAccommodation = () => {
    navigation.navigate('AccommodationAddress');
  };

  useEffect(() => {
    if (isLoggedIn) {
      getAccountDetails();
    }
  }, [isLoggedIn, isGuestAccount, getAccountDetails]);

  useEffect(() => {
    if (userError || accommodationError || myAccommodationsError) {
      setErrorVisible(true);
    }
  }, [userError, accommodationError, myAccommodationsError]);

  useEffect(() => {
    dispatch(accountActions.clearError());
    dispatch(myAccommodationsListActions.clearError());
    dispatch(accommodationActions.clearError());
    dispatch(userActions.clearError());
  }, [dispatch]);

  return (
    <ScreenTemplate>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            progressBackgroundColor={colors.background}
            colors={[colors.tint]}
          />
        }
      >
        <ProfileHeader isLoggedIn={isLoggedIn} />

        {isLoggedIn && !isGuestAccount && (
          <TouchableOpacity
            style={[styles.createAirBnbCard, { backgroundColor: colors.secondaryBackground }]}
            onPress={navigateToCreateAccommodation}
          >
            <View style={styles.createAirBnbTitleContainer}>
              <Text style={styles.createAirBnbTitle}>{t('Add your place')}</Text>
              <Text style={styles.createAirBnbSubTitle}>
                {t("It's simple to get set up and start earning")}
              </Text>
            </View>

            <Image
              source={{
                uri: AIR_BNB_IMAGE_URL,
              }}
              style={styles.image}
            />
          </TouchableOpacity>
        )}

        {isLoggedIn && (
          <>
            <NavigationList sections={ACCOUNT_SECTIONS} />

            <TouchableOpacity onPress={handleLogOut} style={styles.signOutBtn}>
              <Text style={styles.signOutBtnText}>Sign out</Text>
            </TouchableOpacity>
          </>
        )}

        <ProfileFooter />
      </ScrollView>

      <Alert
        visible={errorVisible}
        message={
          userError?.error?.message ||
          accommodationError?.error?.message ||
          myAccommodationsError?.error?.message
        }
        onClose={() => setErrorVisible(false)}
      />
    </ScreenTemplate>
  );
};

export default Profile;
