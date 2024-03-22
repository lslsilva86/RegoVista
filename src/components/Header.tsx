import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchButton from './SearchButton';

const Header = () => {
  const onSearchPress = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Logo</Text>
      <TouchableOpacity
        onPress={onSearchPress}
        style={styles.searchButton}
      >
        <SearchButton />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eee',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  searchButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default Header;
