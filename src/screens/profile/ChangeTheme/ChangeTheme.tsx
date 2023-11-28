import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { Button, Icon, Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { useTheme } from 'src/theme';
import { ThemeType } from 'src/theme/types';
import { IconName } from 'src/types/ui';

import { styles } from './ChangeTheme.style';

const ChangeTheme = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { setScheme, colors, isDark } = useTheme();

  useEffect(() => {
    setIsSelected(isDark);
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
  }, [isDark]);

  const changeTheme = () => {
    const selectedTheme = isSelected ? ThemeType.Dark : ThemeType.Light;
    AsyncStorage.setItem('theme', selectedTheme);

    setScheme(selectedTheme);
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.radioWrapper, { backgroundColor: colors.secondaryBackground }]}
          onPress={() => setIsSelected(true)}
        >
          <Icon name={isSelected ? IconName.RadioButtonsOn : IconName.RadioButtonsOff} />
          <Text style={styles.radioLabel}>Dark theme</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.radioWrapper, { backgroundColor: colors.secondaryBackground }]}
          onPress={() => setIsSelected(false)}
        >
          <Icon name={isSelected ? IconName.RadioButtonsOff : IconName.RadioButtonsOn} />
          <Text style={styles.radioLabel}>Light theme</Text>
        </TouchableOpacity>

        <Button title="Save" onPress={changeTheme} marginVertical={20} />
      </View>
    </ScreenTemplate>
  );
};

export default ChangeTheme;
