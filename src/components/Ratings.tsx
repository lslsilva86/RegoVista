import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { Colors } from '../utils/Colors';
import { Movie } from '../types/MovieTypes';
import { displayError } from '../utils/CommonFunctions';
import { useAuth } from '../contexts/AuthContext';
import { fetchAllRatedMovies, updateRatingByMovieId, deleteRatingByMovieId } from '../api/movieRatingService';

interface Props {
  movieId: string;
}

const Ratings: React.FC<Props> = ({ movieId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [movieRatingText, setMovieRatingText] = useState('');
  const { accountId } = useAuth();

  const findMovieRatingById = (movies: Movie[], movieId: string) => {
    const movie = movies.find((movie) => {
      return movie.id.toString() === movieId;
    });
    return movie ? `Your Vibe ${Math.round(movie?.rating) * 10}%` : "What's' Your Vibe?";
  };

  const fetchMovie = async () => {
    try {
      const response = await fetchAllRatedMovies(accountId);
      const ratingText: string = findMovieRatingById(response, movieId);
      if (ratingText) {
        setMovieRatingText(ratingText);
      }
    } catch (error) {
      displayError(error, 'Error fetching movies:');
    }
  };

  const handleUpdateRating = async () => {
    try {
      const response = await updateRatingByMovieId(rating, movieId);
      setMovieRatingText(response ? `Your Vibe ${rating * 10}%` : "What's' Your Vibe?");
    } catch (error) {
      displayError(error, 'Failed to update rating: ');
    }
  };

  const handleDeleteRating = async () => {
    try {
      const response = await deleteRatingByMovieId(movieId);
      setRating(5);
      setMovieRatingText(response.success ? "What's' Your Vibe?" : `Your Vibe ${rating * 10}%`);
    } catch (error) {
      displayError(error, 'Failed to delete rating: ');
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={styles.button}
        onPress={() => {
          setIsOpen(!isOpen);
        }}
      >
        {movieRatingText}
      </Text>
      {isOpen ? (
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Rating: {rating.toFixed(1)}</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={1}
            maximumValue={10}
            step={0.5}
            value={rating}
            onValueChange={setRating}
            minimumTrackTintColor="#1fb28a"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#b9e4c9"
          />
          <View style={styles.buttons}>
            <Button
              title="Update Rating"
              onPress={handleUpdateRating}
            />
            <Button
              title="Delete Rating"
              onPress={handleDeleteRating}
              color="red"
            />
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Ratings;

const styles = StyleSheet.create({
  button: {
    width: 200,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: Colors.primary,
    color: Colors.text,
    textAlign: 'center',
  },
  container: {
    marginBottom: 30,
  },
  ratingContainer: {
    padding: 20,
    backgroundColor: Colors.primary,
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
