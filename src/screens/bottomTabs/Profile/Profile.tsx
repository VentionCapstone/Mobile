import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, TouchableOpacity, View } from 'react-native';
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
  getAccountInfos,
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

const Profile = () => {
  const userId = useSelector(getUserId);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isGuestUser = useSelector(getIsGuestAccount);
  const accountDetails = useSelector(getAccountInfos);
  const userError = useSelector(getAccountError);
  const accommodationError = useSelector(getAccommodationError);
  const myAccommodationsError = useSelector(getMyAccommodationsError);
  const colors = useSelector(getColors);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleLogOut = async () => {
    showAlert('warning', {
      message: 'Are you sure you want to log out?',
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

  const getAccountDetails = async () => {
    if (!userId) return;
    const user = await dispatch(AsyncThunks.getUserDetails(userId));
    const userProfile = (user.payload as ApiSuccessResponseType<User>).data.profile;

    if (userProfile) {
      const profileId = userProfile.id;
      await dispatch(AsyncThunks.getAccountDetails(profileId));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    if (accountDetails) {
      await dispatch(AsyncThunks.getAccountDetails(accountDetails.id));
      setRefreshing(false);
    }
  };

  const navigateToCreateAccommodation = () => {
    navigation.navigate('AccommodationAddress');
  };

  useEffect(() => {
    if (!accountDetails && isLoggedIn) {
      getAccountDetails();
    }
  }, [isLoggedIn, isGuestUser]);

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
  }, []);

  return (
    <ScreenTemplate headerShown={false}>
      <FlatList
        data={['header', 'createAccommodation', 'accountSections', 'logout']}
        keyExtractor={(item) => item}
        refreshControl={
          isLoggedIn ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[TOMATO]} />
          ) : undefined
        }
        renderItem={({ item }) => {
          switch (item) {
            case 'header':
              return <ProfileHeader isLoggedIn={isLoggedIn} />;
            case 'createAccommodation':
              return (
                <>
                  {isLoggedIn && (
                    <TouchableOpacity
                      style={[styles.createAirBnbCard, { backgroundColor: colors.background }]}
                      onPress={navigateToCreateAccommodation}
                    >
                      <View style={styles.createAirBnbTitleContainer}>
                        <Text style={styles.createAirBnbTitle}>AirBnb your place</Text>
                        <Text style={styles.createAirBnbSubTitle}>
                          It's simple to get set up and start earning
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
                </>
              );
            case 'accountSections':
              return (
                <>
                  {isLoggedIn && (
                    <View>
                      <NavigationList sections={ACCOUNT_SECTIONS} />
                      <Button
                        title="Log out"
                        marginVertical={30}
                        type={ButtonType.SECONDARY}
                        onPress={handleLogOut}
                      />
                    </View>
                  )}
                </>
              );
            case 'logout':
              return <ProfileFooter />;
            default:
              return null;
          }
        }}
        style={styles.container}
      />

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
