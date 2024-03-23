import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Colors } from '../utils/Colors';
import WatchlistScreen from '../screens/WatchlistScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Movies"
      screenOptions={{
        tabBarActiveTintColor: Colors.medium,
        tabBarInactiveTintColor: Colors.text,
        tabBarStyle: { backgroundColor: Colors.primary },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="home"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistScreen}
        options={{
          tabBarLabel: 'Watchlist',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="bookmarks"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Me',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="person-2"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
