import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Colors } from '../utils/Colors';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Movies"
      screenOptions={{
        tabBarActiveTintColor: Colors.secondary,
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
      {/* <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      /> */}
      <Tab.Screen
        name="Me"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Me',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="settings"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  trending: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  switchText: {
    opacity: 0.2,
    fontSize: 20,
    fontWeight: '600',
  },
  textActive: {
    opacity: 1,
  },
  flatList: {
    marginBottom: 150,
  },
  noMovies: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default BottomTabNavigator;
