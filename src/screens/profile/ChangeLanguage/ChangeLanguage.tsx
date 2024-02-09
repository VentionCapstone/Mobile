import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Alert, Button, Icon, Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import i18n from 'src/i18n/i18n';
import { useAppDispatch } from 'src/store';
import { getAccountLoader, getColors, getUserDetails, getUserId } from 'src/store/selectors';
import { changeLanguage } from 'src/store/slices';
import { AsyncThunks } from 'src/store/thunks';
import { AlertType, IconName, Language } from 'src/types';
import { LANGUAGES } from 'src/utils';

import { styles } from './ChangeLanguage.style';

const ChangeLanguage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const colors = useSelector(getColors);
  const loader = useSelector(getAccountLoader);
  const userDetails = useSelector(getUserDetails);
  const userId = useSelector(getUserId);
  const [successVisible, setSuccessVisible] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(
    userDetails?.profile?.language
  );

  const formValues = useMemo(
    () => ({
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      phoneNumber: userDetails?.profile?.phoneNumber,
      gender: userDetails?.profile?.gender,
      description: userDetails?.profile?.description,
      language: userDetails?.profile?.language,
      imageUrl: userDetails?.profile?.imageUrl,
      country: userDetails?.profile?.country,
    }),
    [userDetails]
  );

  const handleChangeLanguage = useCallback(async () => {
    if (!userId) return;

    const response = await dispatch(
      AsyncThunks.updateAccount({
        id: userDetails?.profile?.id,
        formValues: { ...formValues, language: selectedLanguage },
      })
    );

    if (response?.meta.requestStatus === 'fulfilled') {
      setSuccessVisible(true);
      dispatch(changeLanguage(selectedLanguage));
      i18n.changeLanguage(selectedLanguage);
    }
  }, [dispatch, formValues, userId, userDetails?.profile?.id, selectedLanguage]);

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
        <Alert
          type={AlertType.Success}
          visible={successVisible}
          title="Updated successfully"
          onClose={() => setSuccessVisible(false)}
        />
      </View>
    </ScreenTemplate>
  );
};

export default ChangeLanguage;
