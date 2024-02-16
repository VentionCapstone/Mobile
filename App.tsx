import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import RootRouter from 'src/navigation/RootStackNavigator';
import { store } from 'src/store';
import { changeLanguage } from 'src/store/slices';
import { Language } from 'src/types';

import i18n from './src/i18n/i18n';

export default function App() {
  const language = store.getState().account?.result?.language || Language.English;

  useEffect(() => {
    i18n.changeLanguage(language);
    store.dispatch(changeLanguage(language));
  }, [language]);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootRouter />
        <Toast />
      </Provider>
    </NavigationContainer>
  );
}
