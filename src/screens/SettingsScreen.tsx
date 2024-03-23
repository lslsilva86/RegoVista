import React from 'react';
import { Text, View, Button } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const SettingsScreen = () => {
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
      <Button
        title="Log Out"
        onPress={() => logout()}
      />
    </View>
  );
};

export default SettingsScreen;
