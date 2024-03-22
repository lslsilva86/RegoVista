import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, FlatList } from 'react-native';
import Header from '../components/Header';
import { getTrendingMoviesToday, getTrendingMoviesThisWeek } from '../api/movieService';
import MovieCard from '../components/MovieCard';

const HomeScreen = () => {
  const [moviesToday, setMoviesToday] = useState([]); // State variable to hold movies
  const [moviesThisWeek, setMoviesThisWeek] = useState([]); // State variable to hold movies
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [toggleValue, setToggleValue] = useState(true); // State for toggle button

  const fetchMovies = async () => {
    try {
      if (toggleValue) {
        const response = await getTrendingMoviesToday();
        setMoviesToday(response.results);
      } else {
        const response = await getTrendingMoviesThisWeek();
        setMoviesThisWeek(response.results);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [toggleValue]);

  if (isLoading) {
    return <Text style={styles.noMovies}>Loading movies...</Text>;
  }

  return (
    <View>
      <Header />
      <View style={styles.switchContainer}>
        <Text style={styles.trending}>Trending </Text>
        <Text style={[styles.switchText, !toggleValue && styles.textActive]}>Today </Text>
        <Switch
          value={toggleValue}
          onValueChange={setToggleValue}
          trackColor={{ false: '#ccc', true: '#007bff' }}
        />
        <Text style={[styles.switchText, toggleValue && styles.textActive]}> This Week</Text>
      </View>
      <FlatList
        style={styles.flatList}
        data={toggleValue ? moviesToday : moviesThisWeek}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
      <Text style={styles.noMovies}>No movies found yet!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  trending: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  switchText: {
    opacity: 0.2,
    fontSize: 20,
    fontWeight: '600',
  },
  textActive: {
    opacity: 1,
  },
  flatList: {
    marginBottom: 120,
  },
  noMovies: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
