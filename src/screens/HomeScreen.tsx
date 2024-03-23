import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, FlatList } from 'react-native';

import Header from '../components/Header';
import { getTrendingMoviesToday, getTrendingMoviesThisWeek } from '../api/movieService';
import MovieCard from '../components/MovieCard';
import { Colors } from '../utils/Colors';
import globalStyles from '../utils/Styles';
import { useAuth } from '../contexts/AuthContext';
import { getAccount } from '../api/authService';
import { displayError } from '../utils/CommonFunctions';
import { Movie } from '../types/MovieTypes';

interface Item {
  id: number;
  movie: Movie;
}

const HomeScreen = () => {
  const [moviesToday, setMoviesToday] = useState([]);
  const [moviesThisWeek, setMoviesThisWeek] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toggleValue, setToggleValue] = useState(true);
  const { setAccountId, sessionId, accountId } = useAuth();

  const fetchAndSetAccountId = async (sessionId: string) => {
    try {
      const account = await getAccount(sessionId);
      setAccountId(account.id.toString());
    } catch (error) {
      displayError(error, 'Failed to fetch account ID:');
    }
  };

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
      displayError(error, 'Error fetching movies:');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchAndSetAccountId(sessionId);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [toggleValue]);

  if (isLoading) {
    return <Text style={styles.noMovies}>Loading movies...</Text>;
  }

  return (
    <View style={globalStyles.mainContainer}>
      <Header />
      <View style={[styles.switchContainer, { marginHorizontal: 10 }]}>
        <Text style={styles.trending}>Trending </Text>
        <Text style={[styles.switchText, !toggleValue && styles.textActive]}>Today </Text>
        <Switch
          value={toggleValue}
          onValueChange={setToggleValue}
          trackColor={{ false: Colors.text, true: Colors.primary }}
        />
        <Text style={[styles.switchText, toggleValue && styles.textActive]}> This Week</Text>
      </View>
      <FlatList
        style={styles.flatList}
        data={toggleValue ? moviesToday : moviesThisWeek}
        keyExtractor={(item: Item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
      {moviesToday.length === 0 ? <Text style={globalStyles.noResultsMsg}>No movies found yet!</Text> : <></>}
    </View>
  );
};

const styles = StyleSheet.create({
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
