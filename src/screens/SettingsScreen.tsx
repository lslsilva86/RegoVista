import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { getAccountId } from '../api/authService';
import { displayError } from '../utils/CommonFunctions';
import { Account } from '../types/AccountTypes';
import globalStyles from '../utils/Styles';
import { Colors } from '../utils/Colors';

const SettingsScreen = () => {
  const { logout, sessionId } = useAuth();
  const [userData, setUserData] = useState<Account>();

  const fetchData = async () => {
    try {
      const response = await getAccountId(sessionId);
      setUserData(response);
    } catch (error) {
      displayError(error, 'Error fetching movies:');
    }
  };

  useEffect(() => {
    fetchData();
  }, [sessionId]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.title}>Profile Infomation</Text>
      <Image
        source={{ uri: `https://www.gravatar.com/avatar/${userData?.avatar.hash}?s=200&d=identicon` }}
        style={styles.avatar}
      />
      <Text style={styles.text}>{userData?.name}</Text>
      <Text
        style={styles.logoutButton}
        onPress={() => logout()}
      >
        Log Out
      </Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    marginVertical: 30,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 20,
    fontSize: 14,
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.accent,
    color: 'white',
  },
});
