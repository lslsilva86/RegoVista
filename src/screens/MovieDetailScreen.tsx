import { IMAGE_BASE_URL } from '@env';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Linking, Button, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getDetailsByMovieId } from '../api/movieService';
import { Colors } from '../utils/Colors';
import { getHours, getYear } from '../utils/CommonFunctions';

interface Genre {
  id: number;
  name: string;
}
interface Language {
  name: string;
  english_name: string;
}

interface Movie {
  title: string;
  poster_path: string;
  tagline: string;
  genres: Genre[];
  homepage: string;
  overview: string;
  vote_average: number;
  release_date: string;
  spoken_languages: Language[];
  runtime: number;
  video: string;
}

const MovieDetailScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovie = async (id: string) => {
    try {
      const response = await getDetailsByMovieId(id);
      setMovie(response);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePress = async () => {
    const url = movie?.homepage || 'https://regovista.com';
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      Linking.openURL(url);
    } else {
      console.error('Cannot open URL:', url);
    }
  };

  useEffect(() => {
    fetchMovie(movieId);
  }, []);

  if (!movie) return null;

  return (
    <View style={styles.container}>
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
            <View>
              <Text style={styles.date}>{getYear(movie.release_date)}</Text>
              <View style={styles.langs}>
                {movie.spoken_languages &&
                  movie.spoken_languages.map((item, index) => (
                    <Text
                      style={styles.lang}
                      key={index}
                    >
                      {item.english_name}
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
              onPress={handlePress}
              color={Colors.accent}
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
    padding: 30,
    backgroundColor: Colors.background,
  },
  imageWrapper: {
    flexDirection: 'row',
  },
  genres: {
    flexDirection: 'row',
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
    width: 200,
    height: 300,
    marginRight: 10,
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
    fontSize: 16,
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
