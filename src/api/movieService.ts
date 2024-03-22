import axios from 'axios';
import { API_KEY, API_BASE_URL } from '@env';
import { displayError } from '../utils/CommonFunctions';
import { Reviews } from '../types/MovieTypes';

// Initialize Axios instance with base URL and default params
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  params: { api_key: API_KEY },
});

/**
 * Fetches trending movies for the current day.
 * @returns A promise that resolves to the data of trending movies for the day.
 */
export const getTrendingMoviesToday = async () => {
  try {
    const response = await axiosInstance.get('/trending/movie/day');
    return response.data;
  } catch (error) {
    displayError(error, 'Failed to fetch trending movies for day:');
  }
};

/**
 * Fetches trending movies for the current week.
 * @returns A promise that resolves to the data of trending movies for the week.
 */
export const getTrendingMoviesThisWeek = async () => {
  try {
    const response = await axiosInstance.get('/trending/movie/week');
    return response.data;
  } catch (error) {
    displayError(error, 'Failed to fetch trending movies for week:');
  }
};

/**
 * Fetches movies based on a search query.
 * @param query The search term used to find movies.
 * @returns A promise that resolves to the search results data.
 */
export const getMoviesByQuery = async (query: string) => {
  const options = {
    params: { query, include_adult: 'false', page: '1' },
  };
  try {
    const response = await axiosInstance.get('/search/movie', options);
    return response.data;
  } catch (error) {
    displayError(error, 'Failed to fetch searched movies');
  }
};

/**
 * Fetches details for a specific movie by ID.
 * @param id The ID of the movie.
 * @returns A promise that resolves to the movie's detailed data.
 */
export const getDetailsByMovieId = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    displayError(error, 'Failed to fetch movie details');
  }
};

/**
 * Fetches reviews for a specific movie by ID, optionally by page number.
 * @param id The movie's ID.
 * @param pageNo Optional page number for pagination of reviews.
 * @returns A promise resolving to the movie reviews response or undefined in case of an error.
 */
export const getReviewsByMovieId = async (id: string, pageNo: number = 1): Promise<Reviews | undefined> => {
  try {
    const response = await axiosInstance.get<Reviews>(`/movie/${id}/reviews`, {
      params: { page: pageNo },
    });
    return response.data;
  } catch (error) {
    displayError(error, 'Failed to fetch movie reviews');
  }
};
