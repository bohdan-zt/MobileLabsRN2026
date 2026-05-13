import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { GameProvider, GameContext } from './src/context/GameContext';
import { lightTheme, darkTheme } from './src/theme/theme';

import GameScreen from './src/screens/GameScreen';
import ChallengesScreen from './src/screens/ChallengesScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
    const { isDarkMode } = useContext(GameContext);
    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={theme.card}
            />
            <NavigationContainer>
                <Drawer.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: theme.card, shadowColor: 'transparent', elevation: 0 },
                        headerTintColor: theme.text,
                        drawerStyle: { backgroundColor: theme.background },
                        drawerActiveTintColor: theme.primary,
                        drawerInactiveTintColor: theme.text,
                    }}
                >
                    <Drawer.Screen name="Gesture Clicker" component={GameScreen} />
                    <Drawer.Screen name="Досягнення" component={ChallengesScreen} />
                    <Drawer.Screen name="Налаштування" component={SettingsScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
};

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <GameProvider>
                <AppNavigator />
            </GameProvider>
        </GestureHandlerRootView>
    );
}