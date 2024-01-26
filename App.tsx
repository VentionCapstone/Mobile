import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import i18n from 'src/localization/i18n';
import RootRouter from 'src/navigation/RootStackNavigator';
import { store } from 'src/store';
import { Language } from 'src/types';

export default function App() {
  useEffect(() => {
    i18n.changeLanguage(Language.Russian);
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootRouter />
      </Provider>
    </NavigationContainer>
  );
}
