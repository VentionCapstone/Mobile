import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Icon, Text, showToast } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import i18n from 'src/i18n/i18n';
import { useAppDispatch } from 'src/store';
import { getAccountInfos, getAccountLoader, getColors, getUserId } from 'src/store/selectors';
import { changeLanguage } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { IconName, Language } from 'src/types';
import { LANGUAGES } from 'src/utils';

import { styles } from './ChangeLanguage.style';

const ChangeLanguage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const colors = useSelector(getColors);
  const loader = useSelector(getAccountLoader);
  const accountDetails = useSelector(getAccountInfos);
  const userId = useSelector(getUserId);
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(
    accountDetails?.language
  );

  const handleChangeLanguage = async () => {
    if (!userId) return;
    if (selectedLanguage === accountDetails?.language) return;

    const response = await dispatch(
      AsyncThunks.updateAccount({
        id: accountDetails?.id,
        formValues: { language: selectedLanguage },
      })
    );

    if (response?.meta.requestStatus === 'fulfilled') {
      showToast({ text1: t('Language changed successfully') });
      dispatch(changeLanguage(selectedLanguage));
      i18n.changeLanguage(selectedLanguage);
    }
  };

  const handleLanguagePress = (key: Language) => setSelectedLanguage(key);

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang.key}
            style={[styles.radioContainer, { backgroundColor: colors.secondaryBackground }]}
            onPress={() => handleLanguagePress(lang.key)}
          >
            <Icon
              name={
                selectedLanguage === lang.key ? IconName.RadioButtonsOn : IconName.RadioButtonsOff
              }
            />
            <Text style={styles.radioLabel}>{lang.title}</Text>
          </TouchableOpacity>
        ))}

        <Button
          title={t('Save change')}
          marginVertical={30}
          isLoading={loader}
          onPress={handleChangeLanguage}
        />
      </View>
    </ScreenTemplate>
  );
};

export default ChangeLanguage;
