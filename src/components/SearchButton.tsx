import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchButton = () => {
  const navigation = useNavigation();

  return (
    <Button
      title="Search"
      onPress={() => navigation.navigate('Search')}
    />
  );
};

export default SearchButton;
