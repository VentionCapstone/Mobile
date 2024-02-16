import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Loader,
  NavigationList,
  ProfileFooter,
  ProfileHeader,
  Text,
  showToast,
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
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  const handleLogOut = useCallback(async () => {
    setLogoutLoading(true);
    const response = await dispatch(AsyncThunks.signOut());

    if (response?.meta.requestStatus === 'fulfilled') {
      setLogoutLoading(false);
      dispatch(accountActions.reset());
      dispatch(userActions.reset());
      showToast({ text1: "You've been logged out" });
    }
  }, [dispatch]);

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
    if (isGuestAccount || !isLoggedIn) return;

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
      showToast({
        type: 'error',
        text1: 'Error occured!',
        text2:
          `${userError?.error?.message}` ||
          `${accommodationError?.error?.message}` ||
          `${myAccommodationsError?.error?.message}`,
      });
    }
  }, [userError, accommodationError, myAccommodationsError]);

  useEffect(() => {
    dispatch(accountActions.clearError());
    dispatch(myAccommodationsListActions.clearError());
    dispatch(accommodationActions.clearError());
    dispatch(userActions.clearError());
  }, [dispatch]);

  return (
    <ScreenTemplate headerShown={false}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            progressBackgroundColor={colors.secondaryBackground}
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
        <Loader visible={logoutLoading} message="Signing user out..." />
      </ScrollView>
    </ScreenTemplate>
  );
};

export default Profile;
