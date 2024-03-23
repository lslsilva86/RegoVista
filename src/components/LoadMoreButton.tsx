import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../utils/Colors';

const LoadMoreButton = (props: { onLoadMorePress: () => {} }) => {
  const { onLoadMorePress } = props;
  return (
    <TouchableOpacity
      onPress={onLoadMorePress}
      style={styles.loadMoreBtn}
    >
      <Text style={styles.buttonText}>Load More</Text>
    </TouchableOpacity>
  );
};

export default LoadMoreButton;

const styles = StyleSheet.create({
  loadMoreBtn: {
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: Colors.accent,
  },
  buttonText: {
    paddingVertical: 5,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
