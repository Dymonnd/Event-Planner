import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from './ThemeContext';

import HomeScreen from './Screens/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import DetailsScreen from './Screens/DetailsScreen';
import EventLoadScreen from './Screens/EventLoadScreen';
import EventsScreen from './Screens/EventsScreen';
import RegisterEventScreen from './Screens/RegisterEventScreen';
import EventNotFoundScreen from './Screens/EventNotFoundScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Events') iconName = 'calendar-outline';
          else if (route.name === 'Settings') iconName = 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Root"
              component={Tabs}
              options={{ headerShown: false }}
            />
            {/* Navigation to details, registration, loading, etc from any tab */}
            <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EventLoad" component={EventLoadScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterEvent" component={RegisterEventScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EventNotFound" component={EventNotFoundScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Events" component={EventsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
}
