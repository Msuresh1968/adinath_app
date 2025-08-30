
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// react-native-paper
import {
  Provider as PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
  
} from 'react-native-paper';

import { Provider } from 'react-redux';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screen
import Stock from './screens/Stock/Stock';
import StoneDetail from './screens/Stock/StoneDetail';
import StockViewer from './screens/StockView';



const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  
  const customColors = {
    primary: '#6200ee', // purple
    secondary: '#03dac6', // teal
    tertiary: '#ff6d00', // orange
  };

  // extend light and dark themes
  const lightTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...customColors,
    },
  };

  const darkTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...customColors,
    },
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <NavigationContainer>

        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
          </NavigationContainer>
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  return(
  <Stack.Navigator initialRouteName="Stock Viewer">
      <Stack.Screen name="Stock Viewer" component={StockViewer} />
      <Stack.Screen name="Stock" component={Stock} />
      <Stack.Screen name="Stone" component={StoneDetail} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;