import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

import Header from '../components/Header';
import { getWatchlist } from '../api/movieWatchlistService'; // Make sure you have this function implemented
import MovieCard from '../components/MovieCard';
import globalStyles from '../utils/Styles';
import { useAuth } from '../contexts/AuthContext';
import { displayError } from '../utils/CommonFunctions';
import { Movie } from '../types/MovieTypes';
import { Colors } from '../utils/Colors';

interface Item {
  id: number;
  movie: Movie;
}

const WatchlistScreen = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const { sessionId } = useAuth();

  const fetchWatchlist = async (page: number) => {
    try {
      const response = await getWatchlist(sessionId, page);
      const { movies, totalPages } = response;
      setWatchlist((prevWatchlist) => [...prevWatchlist, ...movies]);
      setTotalPages(totalPages);
      setIsLoading(false);
    } catch (error) {
      displayError(error, 'Error fetching watchlist:');
    }
  };

  useEffect(() => {
    fetchWatchlist(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading && page === 1) {
    return <Text style={styles.loadingText}>Loading watchlist...</Text>;
  }

  return (
    <View style={[globalStyles.mainContainer, styles.container]}>
      <Header />
      <FlatList
        data={watchlist}
        keyExtractor={(item: Item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
      {totalPages > page && (
        <Button
          title="Load More"
          onPress={handleLoadMore}
          color={Colors.accent}
        />
      )}
      {watchlist.length === 0 && <Text style={styles.noMovies}>Your watchlist is empty!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  noMovies: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});

export default WatchlistScreen;
