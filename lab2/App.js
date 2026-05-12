import 'react-native-gesture-handler'; // Обов'язково на самому початку!
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Імпортуємо ваші створені екрани
import MainScreen from './src/screens/MainScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ContactsScreen from './src/screens/ContactsScreen';

// Імпортуємо кастомний компонент бічного меню
import CustomDrawer from './src/components/CustomDrawer';

// Створюємо екземпляри навігаторів
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

/**
 * 1. Створюємо Stack Navigator для новин.
 * Це дозволяє переходити зі списку на деталі кожної новини.
 */
function NewsStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen
            name="MainList"
            component={MainScreen}
            // Приховуємо внутрішній заголовок, щоб не було дублювання з Drawer
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Details"
            component={DetailsScreen}
            // Встановлюємо заголовок екрана деталей динамічно з назви новини
            options={({ route }) => ({
              title: route.params.newsItem.title
            })}
        />
      </Stack.Navigator>
  );
}

/**
 * 2. Головний компонент App.
 * Тут налаштовуємо Drawer (бічне меню) як основну навігацію додатка.
 */
export default function App() {
  return (
      <NavigationContainer>
        <Drawer.Navigator
            initialRouteName="Новини"
            // Підключаємо ваш кастомний компонент з ПІБ та групою
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
              drawerActiveTintColor: '#007bff',
              drawerLabelStyle: {
                fontSize: 16,
              },
            }}
        >
          {/* Пункт меню "Новини": містить у собі весь стек навігації новин */}
          <Drawer.Screen
              name="Новини"
              component={NewsStack}
              options={{ title: 'Стрічка новин' }}
          />

          {/* Пункт меню "Контакти": відображає список контактів із SectionList */}
          <Drawer.Screen
              name="Контакти"
              component={ContactsScreen}
              options={{ title: 'Список контактів' }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
  );
}