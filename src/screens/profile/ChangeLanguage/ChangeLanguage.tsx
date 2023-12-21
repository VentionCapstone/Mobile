import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon, Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { getColors } from 'src/store/selectors';
import { IconName } from 'src/types';

import { styles } from './ChangeLanguage.style';

const ChangeLanguage = () => {
  const colors = useSelector(getColors);

  const languages = [
    { title: 'Uzbek', key: 'uz' },
    { title: 'English', key: 'en' },
    { title: 'Russian', key: 'ru' },
  ];

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.key}
            style={[styles.radioContainer, { backgroundColor: colors.secondaryBackground }]}
          >
            <Icon name={IconName.RadioButtonsOff} />
            <Text style={styles.radioLabel}>{lang.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenTemplate>
  );
};

export default ChangeLanguage;
