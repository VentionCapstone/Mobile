import React, { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import ThemedView from 'src/components/ThemedView/ThemedView';
import { getColors } from 'src/store/selectors';
import { LanguageOptionType } from 'src/types';
import { IconName } from 'src/types/ui';
import { LANGUAGES } from 'src/utils';

import { styles } from './LanguageSelector.style';
import ModalContainer from '../../ModalContainer/ModalContainer';

type Props = {
  onSelect: (lang: string) => void;
  value?: string;
};

const LanguageSelector = ({ onSelect, value }: Props) => {
  const initialLanguage = value ? LANGUAGES.find((lang) => lang.key === value) : LANGUAGES[0];

  const { secondaryBackground } = useSelector(getColors);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOptionType>(initialLanguage!);

  const handleLanguageSelect = useCallback(
    (language: LanguageOptionType) => {
      setSelectedLanguage(language);
      onSelect(language.key);
      setModalVisible(false);
    },
    [onSelect]
  );

  return (
    <ThemedView>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.selectorButton, { backgroundColor: secondaryBackground }]}
      >
        <Text style={styles.selectedLanguage}>{selectedLanguage?.title ?? 'English'}</Text>
        <Icon name={IconName.ChevronDown} size={20} />
      </TouchableOpacity>

      <ModalContainer bottomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang.key}
            style={styles.radioContainer}
            onPress={() => handleLanguageSelect(lang)}
          >
            <Icon
              name={
                selectedLanguage?.key === lang.key
                  ? IconName.RadioButtonsOn
                  : IconName.RadioButtonsOff
              }
            />
            <Text style={styles.radioLabel}>{lang.title}</Text>
          </TouchableOpacity>
        ))}
      </ModalContainer>
    </ThemedView>
  );
};

export default React.memo(LanguageSelector);
