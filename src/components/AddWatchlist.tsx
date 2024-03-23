import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../utils/Colors';
import { useWatchList } from '../contexts/WatchListContext';
import { addToWatchlist } from '../api/movieWatchlistService';
import { useAuth } from '../contexts/AuthContext';
import { displayError } from '../utils/CommonFunctions';

const AddWatchlist = ({ movieId }) => {
  const { accountId } = useAuth();
  const { watchlist, setWatchlist } = useWatchList();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    console.log(watchlist);
    const alreadyBookmarked = watchlist.some((movie) => movie.id === movieId);
    setIsBookmarked(alreadyBookmarked);
  }, [watchlist, movieId]);

  const handleAddToWatchlist = async () => {
    if (!isBookmarked) {
      try {
        console.log(accountId, movieId);
        const movieToAdd = { id: movieId };
        const response = await addToWatchlist(accountId, movieId.toString(), true);
        if (response) {
          setWatchlist((currentWatchlist) => [...currentWatchlist, movieToAdd]);
          setIsBookmarked(true);
        }
      } catch (error) {
        displayError(error, 'Failed to add to watchlist:');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons
        onPress={handleAddToWatchlist}
        name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
        size={40}
        color={Colors.accent}
      />
      <Text style={styles.text}>{isBookmarked ? 'Added to Watchlist' : 'Add to Watchlist'}</Text>
    </View>
  );
};

export default AddWatchlist;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 9,
    color: Colors.accent,
  },
});
