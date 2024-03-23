import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../utils/Colors';

const AddWatchlist = () => {
  const [bookMarked, setBookMarked] = useState(false);
  return (
    <View style={styles.container}>
      <Ionicons
        onPress={() => {
          setBookMarked(!bookMarked);
        }}
        name={bookMarked ? 'bookmark' : 'bookmark-outline'}
        size={40}
        color={Colors.accent}
      />
      <Text
        style={styles.text}
        onPress={() => {
          setBookMarked(!bookMarked);
        }}
      >
        {bookMarked ? 'Added to Watchlist' : 'Add to Watchlist'}
      </Text>
    </View>
  );
};

export default AddWatchlist;

const styles = StyleSheet.create({
  container: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 9,
    color: Colors.accent,
  },
});
