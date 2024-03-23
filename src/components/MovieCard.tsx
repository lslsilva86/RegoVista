import { IMAGE_BASE_URL } from '@env';
import React from 'react';
import { Pressable, View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../utils/Colors';
import { getYear } from '../utils/CommonFunctions';
import { Movie } from '../types/MovieTypes';

interface MovieCardProps {
  movie: Movie;
}
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigation = useNavigation();

  // if movie.poster_path is null assigning a placeholder image
  const imagePath = movie.poster_path
    ? { uri: `${IMAGE_BASE_URL}${movie.poster_path}` }
    : require('../../assets/movie-placeholder2x.png');

  return (
    <Pressable onPress={() => navigation.navigate('Movie Details', { movieId: movie.id })}>
      <View style={[styles.card, { marginVertical: 10, marginHorizontal: 20 }]}>
        <Image
          style={styles.image}
          source={imagePath}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text>{getYear(movie.release_date)}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome
              name="heart"
              size={24}
              color={Colors.accent}
            />
            <Text style={styles.rate}>{Math.round(movie.vote_average * 10)}%</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  rate: {
    marginLeft: 5,
  },
});
