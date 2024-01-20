import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon, Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { useAppDispatch } from 'src/store';
import { getColors, getIsDarkMode, getUserDetails, getUserId } from 'src/store/selectors';
import { themeActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { IconName, ThemeType } from 'src/types/ui';

import { styles } from './ChangeTheme.style';

const ChangeTheme = () => {
  const dispatch = useAppDispatch();
  const isDark = useSelector(getIsDarkMode);
  const userDetails = useSelector(getUserDetails);
  const userId = useSelector(getUserId);
  const colors = useSelector(getColors);

  const formValues = {
    firstName: userDetails?.firstName,
    lastName: userDetails?.lastName,
    phoneNumber: userDetails?.profile?.phoneNumber,
    gender: userDetails?.profile?.gender,
    description: userDetails?.profile?.description,
    language: userDetails?.profile?.language,
    imageUrl: userDetails?.profile?.imageUrl,
    country: userDetails?.profile?.country,
  };

  const updateTheme = async (uiTheme: ThemeType) => {
    if (userId) {
      await dispatch(
        AsyncThunks.updateAccount({
          id: userId,
          formValues: { ...formValues, uiTheme },
        })
      );
    }
  };

  const enableLightTheme = async () => {
    dispatch(themeActions.setTheme('light'));
    await updateTheme(ThemeType.Light);
  };

  const enableDarkTheme = async () => {
    dispatch(themeActions.setTheme('dark'));
    await updateTheme(ThemeType.Dark);
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.radioContainer, { backgroundColor: colors.secondaryBackground }]}
          onPress={enableDarkTheme}
        >
          <Icon name={isDark ? IconName.RadioButtonsOn : IconName.RadioButtonsOff} />
          <Text style={styles.radioLabel}>Dark theme</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.radioContainer, { backgroundColor: colors.secondaryBackground }]}
          onPress={enableLightTheme}
        >
          <Icon name={isDark ? IconName.RadioButtonsOff : IconName.RadioButtonsOn} />
          <Text style={styles.radioLabel}>Light theme</Text>
        </TouchableOpacity>
      </View>
    </ScreenTemplate>
  );
};

export default ChangeTheme;
