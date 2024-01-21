import { useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Icon, Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { useAppDispatch } from 'src/store';
import { getAccountLoader, getColors, getUserDetails, getUserId } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { IconName, Language } from 'src/types';
import { LANGUAGES } from 'src/utils';

import { styles } from './ChangeLanguage.style';

const ChangeLanguage = () => {
  const colors = useSelector(getColors);
  const [selectedLanguage, setSelectedLanguage] = useState(Language.English);
  const userDetails = useSelector(getUserDetails);
  const userId = useSelector(getUserId);
  const loader = useSelector(getAccountLoader);
  const dispatch = useAppDispatch();

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

  const updateLanguage = useCallback(
    async (language: Language) => {
      if (userId) {
        await dispatch(
          AsyncThunks.updateAccount({
            id: userId,
            formValues: { ...formValues, language },
          })
        );
      }
    },
    [dispatch, formValues, userId]
  );

  const handleLanguagePress = (key: Language) => {
    setSelectedLanguage(key);
  };

  const handleSaveLanguage = useCallback(async () => {
    await updateLanguage(selectedLanguage);
  }, [selectedLanguage, updateLanguage]);

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
          title="Save change"
          marginVertical={30}
          isLoading={loader}
          onPress={handleSaveLanguage}
        />
      </View>
    </ScreenTemplate>
  );
};

export default ChangeLanguage;
