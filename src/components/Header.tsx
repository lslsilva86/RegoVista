import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import SearchButton from './SearchButton';
import { Colors } from '../utils/Colors';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo-s2x.png')}
      />
      <SearchButton />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.primary,
  },
  logo: {
    width: 104,
    height: 34,
  },
  searchButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});
