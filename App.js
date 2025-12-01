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
const EventsStack = createStackNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

function EventsStackScreen() {
  return (
    <EventsStack.Navigator screenOptions={{ headerShown: false }}>
      <EventsStack.Screen name="Events" component={EventsScreen} />
      <EventsStack.Screen name="Details" component={DetailsScreen} />
      <EventsStack.Screen name="RegisterEvent" component={RegisterEventScreen} />
      <EventsStack.Screen name="EventLoad" component={EventLoadScreen} />
      <EventsStack.Screen name="EventNotFound" component={EventNotFoundScreen} />
    </EventsStack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'EventsTab') iconName = 'calendar-outline';
          else if (route.name === 'Settings') iconName = 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="EventsTab"
        component={EventsStackScreen}
        options={{ tabBarLabel: 'Events' }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <ThemeProvider>
      <PaperProvider>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
}
