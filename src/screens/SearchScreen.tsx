import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';
import MovieCard from '../components/MovieCard'; // Adjust the import path as necessary
import globalStyles from '../utils/Styles';
import { getSearchedMovies } from '../api/movieService';
import { Colors } from '../utils/Colors';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async (query: string) => {
    try {
      const response = await getSearchedMovies(query);
      setMovies(response.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 30,
  },
});

export default SearchScreen;
