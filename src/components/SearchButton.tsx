import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../utils/Colors';

const SearchButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('Search')}>
      <AntDesign
        name="search1"
        size={24}
        color={Colors.text}
      />
    </Pressable>
  );
};

export default SearchButton;
