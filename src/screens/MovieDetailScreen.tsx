import { IMAGE_BASE_URL } from '@env';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Linking, Button, ActivityIndicator, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getDetailsByMovieId, getReviewsByMovieId } from '../api/movieService';
import { Colors } from '../utils/Colors';
import { displayError, getHours, getYear } from '../utils/CommonFunctions';
import globalStyles from '../utils/Styles';
import { Movie, Reviews } from '../types/MovieTypes';

const MovieDetailScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Reviews | null>(null);
  const [currentReviewPage, setCurrentReviewPage] = useState(0);
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

  const fetchReviews = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await getReviewsByMovieId(id);
      if (response) {
        setReviews(response);
        setCurrentReviewPage(response.page);
      } else {
        console.error('No reviews fetched');
      }
    } catch (error) {
      displayError(error, 'Error fetching reviews:');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    if (!reviews) return;
    setIsLoading(true);
    try {
      const nextPage = currentReviewPage + 1;
      const response = await getReviewsByMovieId(movieId, nextPage);
      if (response && response.results.length > 0) {
        setReviews((prevReviews) => ({
          ...response,
          results: prevReviews ? [...prevReviews.results, ...response.results] : response.results,
        }));
        setCurrentReviewPage(response.page);
      } else {
        console.log('No more reviews to fetch');
      }
    } catch (error) {
      console.error('Error fetching more reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onMoreDetailsPress = async () => {
    const url = movie?.homepage || 'https://regovista.com';
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      Linking.openURL(url);
    } else {
      console.error('Cannot open URL:', url);
    }
  };

  const onLoadMorePress = () => {
    loadMore();
  };

  useEffect(() => {
    fetchMovie(movieId);
    fetchReviews(movieId);
  }, []);

  if (!movie) return null;

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
              source={{
                uri: movie.poster_path
                  ? `${IMAGE_BASE_URL}/${movie.poster_path}`
                  : '../../assets/movie-placeholder2x.png',
              }}
            />
            <View style={styles.imageRight}>
              <Text style={styles.date}>{getYear(movie.release_date)}</Text>
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
              <Text>{getHours(movie.runtime)}</Text>
              {movie.vote_average && (
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
          <Text style={styles.title}>
            {movie.title} : {movie.tagline}
          </Text>
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
          <Text style={styles.text}>{movie.overview}</Text>
          {movie.homepage && (
            <Button
              title="More Details"
              onPress={onMoreDetailsPress}
              color={Colors.accent}
            />
          )}
          {reviews && (
            <View style={styles.reviews}>
              <Text style={styles.title}>Reviews</Text>
              {reviews.results.map((item, index) => (
                <View
                  key={index}
                  style={styles.review}
                >
                  <Text>{item.content}</Text>
                  <Text style={styles.author}>By {item.author}</Text>
                </View>
              ))}
              {reviews?.total_pages && currentReviewPage < reviews?.total_pages && (
                <Button
                  title="Load More"
                  onPress={onLoadMorePress}
                />
              )}
            </View>
          )}
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
  reviews: {
    marginBottom: 50,
  },
  review: {
    marginTop: 10,
    paddingBottom: 10,
    borderBottomColor: Colors.dark,
    borderBottomWidth: 1,
    width: '100%',
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
  image: {
    flex: 2,
    width: 200,
    height: 300,
    marginRight: 10,
  },
  imageRight: {
    flex: 1,
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
  author: {
    marginTop: 10,
    fontSize: 14,
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
});

export default MovieDetailScreen;
