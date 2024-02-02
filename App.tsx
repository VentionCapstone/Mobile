import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import RootRouter from 'src/navigation/RootStackNavigator';
import { store } from 'src/store';

import i18n from './src/i18n/i18n';

export default function App() {
  const language = store.getState().account?.result?.language;

  useEffect(() => {
    i18n.changeLanguage(language);
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootRouter />
      </Provider>
    </NavigationContainer>
  );
}
