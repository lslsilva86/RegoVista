import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import ReadMoreButton from './ReadMoreButton';

interface Movie {
  poster_path: ImageSourcePropType;
  title: string;
  release_date: string;
}

const MovieCard: React.FC<Movie> = ({ movie }) => {
  console.log(movie);
  return (
    <View style={styles.card}>
      <Text>Test</Text>
      <Image
        style={styles.image}
        source={{ uri: movie?.poster_path }}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text>{movie.release_date}</Text>
      </View>
      <ReadMoreButton />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
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
});

export default MovieCard;
