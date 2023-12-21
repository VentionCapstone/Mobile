import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import RootRouter from 'src/navigation/RootStackNavigator';
import { store } from 'src/store';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootRouter />
      </Provider>
    </NavigationContainer>
  );
}
