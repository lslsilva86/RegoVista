import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import MovieCard from '../components/MovieCard';
import globalStyles from '../utils/Styles';
import { getMoviesByQuery } from '../api/movieService';
import { Colors } from '../utils/Colors';
import { displayError } from '../utils/CommonFunctions';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async (query: string) => {
    try {
      const response = await getMoviesByQuery(query);
      setMovies(response.results);
    } catch (error) {
      displayError(error, 'Error fetching movies:');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim().length > 3) fetchMovies(query);
  }, [query]);

  return (
    <View style={[globalStyles.mainContainer, styles.container]}>
      <TextInput
        style={globalStyles.searchInput}
        placeholder="Search movies..."
        value={query}
        onChangeText={setQuery}
        placeholderTextColor={Colors.dark}
        autoCapitalize="none"
        onSubmitEditing={() => {
          fetchMovies(query);
        }}
      />

      {movies.length === 0 ? (
        <Text style={globalStyles.noResultsMsg}>No movies found yet!</Text>
      ) : (
        <>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
            />
          ) : (
            <FlatList
              data={movies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MovieCard movie={item} />}
            />
          )}
        </>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 30,
  },
});
