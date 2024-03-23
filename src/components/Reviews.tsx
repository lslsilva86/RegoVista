import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../utils/Colors';
import { Reviews } from '../types/MovieTypes';
import { displayError } from '../utils/CommonFunctions';
import { getReviewsByMovieId } from '../api/movieService';

interface Props {
  movieId: string;
}

const ReviewsList: React.FC<Props> = ({ movieId }) => {
  const [reviews, setReviews] = useState<Reviews | null>(null);
  const [currentReviewPage, setCurrentReviewPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  const onLoadMorePress = async () => {
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
      displayError(error, 'Error fetching more reviews:');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(movieId.toString());
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
        />
      ) : (
        <>
          {reviews && (
            <View style={styles.reviews}>
              <Text style={styles.title}>Reviews</Text>
              {reviews.results.map((review, index) => (
                <View
                  key={index}
                  style={styles.review}
                >
                  <Text>{review.content}</Text>
                  <Text style={styles.author}>By {review.author}</Text>
                </View>
              ))}
              {reviews.total_pages && currentReviewPage < reviews.total_pages && (
                <Button
                  title="Load More"
                  onPress={onLoadMorePress}
                />
              )}
            </View>
          )}
        </>
      )}
    </>
  );
};

export default ReviewsList;

const styles = StyleSheet.create({
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
});
