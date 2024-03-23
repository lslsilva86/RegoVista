import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../utils/Colors';
import { useWatchList } from '../contexts/WatchListContext';
import { useAuth } from '../contexts/AuthContext';
import { displayError } from '../utils/CommonFunctions';
import { Movie } from '../types/MovieTypes';

interface Props {
  movieId: string;
}

const AddWatchlist: React.FC<Props> = ({ movieId }) => {
  const { accountId } = useAuth();
  const { watchlist, addMovieToWatchlist } = useWatchList();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const alreadyBookmarked = watchlist.some((movie: Movie) => movie.id.toString() === movieId.toString());
    setIsBookmarked(alreadyBookmarked);
  }, [watchlist, movieId]);

  const handleToggleWatchlist = async () => {
    try {
      await addMovieToWatchlist(accountId, movieId, !isBookmarked);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      displayError(error, 'Failed to update watchlist:');
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleToggleWatchlist}
      disabled={isBookmarked}
    >
      <Ionicons
        name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
        size={40}
        color={Colors.accent}
      />
      <Text style={styles.text}>{isBookmarked ? 'Added to Watchlist' : 'Add to Watchlist'}</Text>
    </TouchableOpacity>
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
