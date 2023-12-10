import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import ThemedView from 'src/components/ThemedView/ThemedView';
import { getColors } from 'src/store/selectors';
import { GREY_400 } from 'src/styles';
import { IconName } from 'src/types/ui';

import { LanguagesProps, languages } from './LanguageSelector.constants';
import { styles } from './LanguageSelector.style';
import ModalContainer from '../ModalContainer/ModalContainer';

type Props = {
  onSelect: (lang: string) => void;
};

const LanguageSelector = ({ onSelect }: Props) => {
  const colors = useSelector(getColors);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguagesProps | null>(languages[0]);

  const handleLanguageSelect = (lang: LanguagesProps) => {
    setSelectedLanguage(lang);
    onSelect(lang.code);
    setModalVisible(false);
  };

  return (
    <ThemedView>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.selectorButton, { backgroundColor: colors.secondaryBackground }]}
      >
        <Text style={styles.selectedLanguage}>{selectedLanguage?.name}</Text>
        <Icon name={IconName.ChevronDown} size={20} />
      </TouchableOpacity>

      <ModalContainer visible={modalVisible} onClose={() => setModalVisible(false)}>
        {languages.map((option: LanguagesProps) => (
          <TouchableOpacity
            key={option.code}
            style={styles.radioContainer}
            onPress={() => handleLanguageSelect(option)}
          >
            <Icon
              name={
                selectedLanguage?.name === option.name
                  ? IconName.RadioButtonsOn
                  : IconName.RadioButtonsOff
              }
              color={GREY_400}
            />
            <Text style={styles.radioLabel}>{option.name}</Text>
          </TouchableOpacity>
        ))}
      </ModalContainer>
    </ThemedView>
  );
};

export default LanguageSelector;
