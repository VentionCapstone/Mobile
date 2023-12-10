import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import RootRouter from 'src/navigation/RootStackNavigator';
import { store } from 'src/store';
import { getIsDarkMode } from 'src/store/selectors';

export default function App() {
  // const isDark = useSelector(getIsDarkMode);

  // useEffect(() => {
  //   StatusBar.setBarStyle(isDark ? 'dark-content' : 'light-content');
  // }, [isDark]);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootRouter />
      </Provider>
    </NavigationContainer>
  );
}
