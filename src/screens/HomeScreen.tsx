import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, FlatList } from 'react-native';

import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import { getTrendingMoviesToday, getTrendingMoviesThisWeek } from '../api/movieService';
import { Colors } from '../utils/Colors';
import globalStyles from '../utils/Styles';
import { useAuth } from '../contexts/AuthContext';
import { getAccountId } from '../api/authService';
import { displayError } from '../utils/CommonFunctions';
import LoadMoreButton from '../components/LoadMoreButton';

const HomeScreen = () => {
  const [moviesToday, setMoviesToday] = useState([]);
  const [moviesThisWeek, setMoviesThisWeek] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [toggleValue, setToggleValue] = useState(true);
  const [currentMoviePage, setCurrentMoviePage] = useState(1);
  const [totalMoviePage, setTotalMoviePage] = useState(0);
  const { setAccountId, sessionId } = useAuth();

  const fetchAndSetAccountId = async (sessionId: string) => {
    try {
      const accId = await getAccountId(sessionId);
      setAccountId(accId.id.toString());
    } catch (error) {
      displayError(error, 'Failed to fetch account ID:');
    }
  };

  const onLoadMorePress = async () => {
    setIsLoading(true);
    try {
      const nextPage = currentMoviePage + 1;
      const response = await getTrendingMoviesThisWeek(nextPage);

      if (response && response.results.length > 0) {
        setMoviesThisWeek((preMovies) => ({
          ...response,
          results: preMovies ? [...preMovies.results, ...response.results] : response.results,
        }));
        setCurrentMoviePage(response.page);
        setTotalMoviePage(response['total_pages']);
      } else {
        console.log('No more movies to fetch');
      }
    } catch (error) {
      displayError(error, 'Error fetching more movies:');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMovies = async () => {
    try {
      if (toggleValue) {
        const response = await getTrendingMoviesToday();
        setMoviesToday(response.results);
      } else {
        const response = await getTrendingMoviesThisWeek(currentMoviePage);
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
  }, [sessionId]);

  useEffect(() => {
    fetchMovies();
  }, [toggleValue]);

  useEffect(() => {
    fetchMovies();
    fetchAndSetAccountId(sessionId);
  }, [sessionId]);

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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        ListFooterComponent={() => {
          return totalMoviePage !== currentMoviePage ? <LoadMoreButton onLoadMorePress={onLoadMorePress} /> : <></>;
        }}
      />
      {moviesToday.length === 0 ? <Text style={globalStyles.noResultsMsg}>No movies found yet!</Text> : null}
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
