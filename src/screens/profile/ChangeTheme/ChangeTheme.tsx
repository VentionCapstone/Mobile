import { View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon, Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { useAppDispatch } from 'src/store';
import { getColors, getIsDarkMode } from 'src/store/selectors';
import { themeActions } from 'src/store/slices';
import { IconName } from 'src/types/ui';

import { styles } from './ChangeTheme.style';

const ChangeTheme = () => {
  const dispatch = useAppDispatch();
  const isDark = useSelector(getIsDarkMode);
  const colors = useSelector(getColors);

  const enableLightTheme = () => {
    dispatch(themeActions.setTheme('light'));
  };

  const enableDarkTheme = () => {
    dispatch(themeActions.setTheme('dark'));
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
