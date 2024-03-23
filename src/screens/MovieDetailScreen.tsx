import { IMAGE_BASE_URL } from '@env';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getDetailsByMovieId } from '../api/movieService';
import { Colors } from '../utils/Colors';
import { displayError, getHours, getYear } from '../utils/CommonFunctions';
import { Movie } from '../types/MovieTypes';
import ReviewsList from '../components/Reviews';
import MoreDetails from '../components/MoreDetails';
import AddWatchlist from '../components/AddWatchlist';
import Ratings from '../components/Ratings';

const MovieDetailScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovie = async (id: string) => {
    try {
      const response = await getDetailsByMovieId(id);
      setMovie(response);
    } catch (error) {
      displayError(error, 'Error fetching movies:');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie(movieId);
  }, []);

  if (!movie) return null;

  // if movie.poster_path is null assigning a placeholder image
  const imagePath = movie.poster_path
    ? { uri: `${IMAGE_BASE_URL}${movie.poster_path}` }
    : require('../../assets/movie-placeholder2x.png');

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
        />
      ) : (
        <>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={imagePath}
            />
            <View style={styles.imageRight}>
              {movie.release_date && <Text style={styles.date}>{getYear(movie.release_date)}</Text>}
              <View style={styles.langs}>
                {movie.spoken_languages &&
                  movie.spoken_languages.map((item, index) => (
                    <Text
                      style={styles.lang}
                      key={index}
                    >
                      {item.english_name}
                      {index < movie.spoken_languages.length - 1 ? ', ' : ''}
                    </Text>
                  ))}
              </View>
              <Text>{movie.runtime > 0 && getHours(movie.runtime)}</Text>
              {movie.vote_average > 0 && (
                <View style={styles.ratingContainer}>
                  <FontAwesome
                    name="heart"
                    size={24}
                    color={Colors.accent}
                  />
                  <Text style={styles.rate}>{Math.round(movie.vote_average * 10)}%</Text>
                </View>
              )}
            </View>
          </View>
          {movie.title && (
            <Text style={styles.title}>
              {movie.title} {movie.tagline && `: ${movie.tagline}`}
            </Text>
          )}
          <View style={styles.genres}>
            {movie.genres &&
              movie.genres.map((item, index) => (
                <Text
                  style={styles.genre}
                  key={index}
                >
                  {item.name}
                </Text>
              ))}
          </View>
          {movie.overview && <Text style={styles.text}>{movie.overview}</Text>}
          <View style={styles.buttons}>
            <View>{movie.homepage && <MoreDetails link={movie.homepage} />}</View>
            <AddWatchlist movieId={movieId} />
          </View>
          {movie.vote_average > 0 && <Ratings movieId={movieId} />}
          {movie.vote_average > 0 && <ReviewsList movieId={movieId} />}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: Colors.background,
  },
  imageWrapper: {
    flexDirection: 'row',
  },
  image: {
    flex: 2,
    width: 200,
    height: 300,
    marginRight: 10,
  },
  imageRight: {
    flex: 1,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  genre: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
    color: Colors.text,
  },
  langs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lang: {
    marginBottom: 5,
    marginRight: 5,
    color: Colors.accent,
    fontWeight: 'bold',
  },
  date: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginVertical: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 10,
    fontSize: 14,
  },
  ratingContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rate: {
    marginLeft: 5,
  },
  buttons: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MovieDetailScreen;
