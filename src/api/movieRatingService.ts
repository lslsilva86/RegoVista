import axios from 'axios';
import { API_KEY, API_READ_ACCESS_TOKEN, API_BASE_URL } from '@env';
import { displayError } from '../utils/CommonFunctions';
import { Movie, Reviews } from '../types/MovieTypes';

/**
 * Axios instance configured with base API URL and default parameters including the API key.
 */
const axiosInstanceWithApiKey = axios.create({
  baseURL: API_BASE_URL,
  params: { api_key: API_KEY },
});

/**
 * Axios instance configured with API read access token.
 */
const axiosInstanceWithAccessToken = axios.create({
  baseURL: API_BASE_URL,
  headers: { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` },
});

/**
 * Requests a new authentication token from the TMDB API.
 * @returns {Promise<string>} A promise that resolves to the new request token.
 */
export const requestToken = async (): Promise<string> => {
  try {
    const response = await axiosInstanceWithAccessToken.get('/authentication/token/new');
    return response.data.request_token;
  } catch (error) {
    displayError(error, 'Failed to fetch request token:');
    throw error;
  }
};

/**
 * Fetches all pages of rated movies and accumulates movie IDs and ratings.
 * @returns {Promise<Array<{id: number, rating: number}>>} An array of objects containing movie IDs and ratings.
 */
export const fetchAllRatedMovies = async (id: string) => {
  let currentPage = 1;
  let totalPages = 1;
  const allMovies = [];

  while (currentPage <= totalPages) {
    try {
      const response = await axiosInstanceWithAccessToken.get(`/account/${id}/rated/movies`, {
        params: { page: currentPage },
      });
      totalPages = response.data.total_pages;
      const moviesWithRatings = response.data.results.map((movie: Movie) => ({
        id: movie.id,
        rating: movie.rating,
      }));
      allMovies.push(...moviesWithRatings);
      currentPage++;
    } catch (error) {
      console.error('Failed to fetch rated movies:', error);
      break;
    }
  }

  return allMovies;
};

/**
 * Updates the rating for a specific movie.
 *
 * @param {string} movieId The ID of the movie to rate.
 * @param {number} rating The new rating to assign to the movie.
 * @returns {Promise} A promise that resolves with the response of the rating update.
 */
export const updateRatingByMovieId = async (rating: number, movieId: string) => {
  try {
    const response = await axiosInstanceWithAccessToken.post(`/movie/${movieId}/rating`, { value: rating.toString() });
    return response.data;
  } catch (error) {
    displayError(error, 'Failed to update movie rating');
  }
};

/**
 * Deletes the rating for a specific movie.
 *
 * @param {string} movieId The ID of the movie for which to delete the rating.
 * @returns {Promise} A promise that resolves with the response of the rating deletion.
 */
export const deleteRatingByMovieId = async (movieId: string) => {
  try {
    const response = await axiosInstanceWithAccessToken.delete(`/movie/${movieId}/rating`);
    return response.data;
  } catch (error) {
    displayError(error, 'Failed to delete movie rating');
    throw error; // It's a good practice to re-throw the error to allow calling code to handle it.
  }
};
