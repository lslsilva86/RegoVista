import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ReadMoreButton = () => {
  const navigation = useNavigation();

  return (
    <Button
      title="Details"
      onPress={() => navigation.navigate('MovieDetails')}
    />
  );
};

export default ReadMoreButton;
