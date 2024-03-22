import { IMAGE_BASE_URL } from '@env';
import React from 'react';
import { Pressable, View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../utils/Colors';
import { getYear } from '../utils/CommonFunctions';

interface Movie {
  poster_path: ImageSourcePropType;
  title: string;
  release_date: string;
  vote_average: number;
  id: number;
}

const MovieCard: React.FC<Movie> = ({ movie }) => {
  const navigation = useNavigation();

  // if movie.poster_path is null assigning a placeholder image
  const imagePath = movie.poster_path
    ? { uri: `${IMAGE_BASE_URL}${movie.poster_path}` }
    : require('../../assets/movie-placeholder2x.png');
  console.log(imagePath);

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

export default MovieCard;
