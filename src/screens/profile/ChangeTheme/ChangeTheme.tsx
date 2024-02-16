import { useTranslation } from 'react-i18next';
import { View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon, Text, showToast } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { useAppDispatch } from 'src/store';
import { getAccountInfos, getColors, getIsDarkMode, getUserId } from 'src/store/selectors';
import { themeActions } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { IconName, ThemeType } from 'src/types/ui';

import { styles } from './ChangeTheme.style';

const ChangeTheme = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useSelector(getIsDarkMode);
  const accountDetails = useSelector(getAccountInfos);
  const userId = useSelector(getUserId);
  const colors = useSelector(getColors);
  const { t } = useTranslation();

  const updateTheme = async (uiTheme: ThemeType) => {
    if (userId) {
      await dispatch(
        AsyncThunks.updateAccount({
          id: accountDetails?.id,
          formValues: { uiTheme },
        })
      );
    }
  };

  const enableLightTheme = async () => {
    if (!isDarkMode) return;

    dispatch(themeActions.setTheme('light'));
    await updateTheme(ThemeType.Light);
    showToast({ text1: 'Light theme enabled' });
  };

  const enableDarkTheme = async () => {
    if (isDarkMode) return;

    dispatch(themeActions.setTheme('dark'));
    await updateTheme(ThemeType.Dark);
    showToast({ text1: 'Dark theme enabled' });
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.radioContainer, { backgroundColor: colors.background }]}
          onPress={enableDarkTheme}
        >
          <View style={styles.radioInnerContainer}>
            <Icon name={IconName.Moon} />
            <Text style={styles.radioLabel}>{t('Dark theme')}</Text>
          </View>
          {isDarkMode && <Icon name={IconName.Check} size={20} color={colors.tint} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.radioContainer, { backgroundColor: colors.background }]}
          onPress={enableLightTheme}
        >
          <View style={styles.radioInnerContainer}>
            <Icon name={IconName.ThemeSun} />
            <Text style={styles.radioLabel}>{t('Light theme')}</Text>
          </View>

          {!isDarkMode && <Icon name={IconName.Check} size={20} color={colors.tint} />}
        </TouchableOpacity>
      </View>
    </ScreenTemplate>
  );
};

export default ChangeTheme;
