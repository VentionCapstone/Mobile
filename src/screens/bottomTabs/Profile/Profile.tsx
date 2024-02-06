import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  ErrorAlert,
  Button,
  ButtonType,
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
import { TOMATO } from 'src/styles';
import { ApiSuccessResponseType, User } from 'src/types';

import { ACCOUNT_SECTIONS, AIR_BNB_IMAGE_URL } from './Profile.constants';
import styles from './Profile.style';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({ navigation }: Props) => {
  const userId = useSelector(getUserId);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isGuestUser = useSelector(getIsGuestAccount);
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
  }, [isLoggedIn, isGuestUser, getAccountDetails]);

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
            colors={[TOMATO]}
          />
        }
      >
        <ProfileHeader isLoggedIn={isLoggedIn} />

        {isLoggedIn && !isGuestUser && (
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
            <Button
              title={t('Log out')}
              marginVertical={30}
              type={ButtonType.SECONDARY}
              onPress={handleLogOut}
            />
          </>
        )}

        <ProfileFooter />
      </ScrollView>

      <ErrorAlert
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
