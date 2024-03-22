import { IMAGE_BASE_URL } from '@env';
import React from 'react';
import { Pressable, View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import ReadMoreButton from './ReadMoreButton';
import RatingCircle from './RatingCircle';
import { Colors } from '../utils/Colors';

interface Movie {
  poster_path: ImageSourcePropType;
  title: string;
  release_date: string;
  vote_average: number;
  id: number;
}

const MovieCard: React.FC<Movie> = ({ movie }) => {
  const navigation = useNavigation();

  const getYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };
  return (
    <Pressable onPress={() => navigation.navigate('Movie Details')}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{ uri: `${IMAGE_BASE_URL}/${movie?.poster_path}` }}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text>{getYear(movie.release_date)}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome
              name="heart"
              size={24}
              color={Colors.primary}
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
