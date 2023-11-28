import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from 'src/api';
import RootRouter from 'src/navigation/RootStackNavigator';
import { ThemeProvider } from 'src/theme';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <ThemeProvider>
          <RootRouter />
        </ThemeProvider>
      </Provider>
    </NavigationContainer>
  );
}
