import React from 'react';
import { Text, View, Button } from 'react-native';
import { useAuth } from '../contexts/AuthContext'; // Adjust the import path as necessary

const SettingsScreen = () => {
  const { logout } = useAuth(); // Destructure the logout function from the context

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
      {/* Add a Button component for logging out */}
      <Button
        title="Log Out"
        onPress={() => logout()} // Call the logout method on press
      />
    </View>
  );
};

export default SettingsScreen;
