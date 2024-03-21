import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import MovieCard from '../components/MovieCard'; // Adjust the import path as necessary
import globalStyles from '../utils/Styles';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([
    {
      poster_path: '../../assets/icon.png',
      title: 'abc',
      release_date: '2024',
    },
  ]);
  const [loading, setLoading] = useState(false);

  //   const API_URL = 'https://api.themoviedb.org/3/search/movie';
  //   const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your TMDB API key

  //   const handleSearch = async () => {
  //     if (!query.trim()) return;
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(`${API_URL}?api_key=${API_KEY}&query=${query}`);
  //       setMovies(response.data.results);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <View style={styles.container}>
      <TextInput
        style={globalStyles.textInput}
        placeholder="Search movies..."
        value={query}
        onChangeText={setQuery}
        // onSubmitEditing={handleSearch}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
        />
      ) : (
        <FlatList
          data={movies}
          //   keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard movie={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});

export default SearchScreen;
