import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import RootRouter from 'src/navigation/RootStackNavigator';
import { store } from 'src/store';
import { BLACK, WHITE } from 'src/styles';

export default function App() {
  const isDark = store.getState().theme.isDark;

  return (
    <NavigationContainer>
      <Provider store={store}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={isDark ? BLACK : WHITE}
        />
        <RootRouter />
      </Provider>
    </NavigationContainer>
  );
}
