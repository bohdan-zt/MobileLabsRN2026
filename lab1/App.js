import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Імпортуємо екрани з папки src/screens
import HomeScreen from './src/screens/HomeScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {/* SafeAreaView захищає контент від налізання на системні елементи (notch, status bar) */}
                <SafeAreaView style={styles.safeArea}>

                    <Tab.Navigator
                        initialRouteName="Головна"
                        screenOptions={{
                            tabBarActiveTintColor: '#007AFF', // Синій колір активної вкладки
                            tabBarInactiveTintColor: 'gray',  // Сірий колір неактивної вкладки
                            tabBarIndicatorStyle: {
                                backgroundColor: '#007AFF',
                                height: 3
                            },
                            tabBarLabelStyle: {
                                fontSize: 13,
                                fontWeight: 'bold',
                                textTransform: 'none' // Вимикає автоматичний верхній регістр
                            },
                            tabBarStyle: {
                                backgroundColor: '#f8f8f8',
                                elevation: 0, // Прибирає тінь на Android
                                shadowOpacity: 0, // Прибирає тінь на iOS
                                borderBottomWidth: 1,
                                borderBottomColor: '#e0e0e0'
                            },
                        }}
                    >
                        <Tab.Screen
                            name="Головна"
                            component={HomeScreen}
                            options={{ tabBarLabel: 'Головна' }}
                        />
                        <Tab.Screen
                            name="Фотогалерея"
                            component={GalleryScreen}
                            options={{ tabBarLabel: 'Фотогалерея' }}
                        />
                        <Tab.Screen
                            name="Профіль"
                            component={ProfileScreen}
                            options={{ tabBarLabel: 'Профіль' }}
                        />
                    </Tab.Navigator>

                    {/* Нижній підвал (Footer) з вашими даними */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Вигівський Богдан, група ЗІПЗ-22-1
                        </Text>
                    </View>

                </SafeAreaView>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    footer: {
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    footerText: {
        fontStyle: 'italic',
        color: 'gray',
        fontSize: 12,
    },
});