import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import globalStyles from '../utils/Styles';
import { useWatchList } from '../contexts/WatchListContext';
import { Colors } from '../utils/Colors';
import { number, string } from 'yup';

const WatchlistScreen = () => {
  const { watchlist, fetchWatchlist } = useWatchList();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadWatchlist = async () => {
      await fetchWatchlist(page.toString());
      setIsLoading(false);
    };

    loadWatchlist();
  }, [page, fetchWatchlist]);

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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        ListFooterComponent={
          watchlist.length && page < totalPages ? (
            <Button
              title="Load More"
              onPress={handleLoadMore}
              color={Colors.accent}
            />
          ) : null
        }
      />
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
