import { API_KEY, API_BASE_URL } from '@env';
import axios from 'axios';
import { displayError } from '../utils/CommonFunctions';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  params: { api_key: API_KEY },
});

export const getTrendingMoviesToday = async () => {
  try {
    const response = await axiosInstance.get('/trending/movie/day');
    return response.data;
  } catch (error) {
    displayError(error, 'Failed to fetch trending movies for day:');
  }
};

export const getTrendingMoviesThisWeek = async () => {
  try {
    const response = await axiosInstance.get('/trending/movie/week');
    return response.data;
  } catch (error) {
    displayError(error, 'Failed to fetch trending movies for week:');
  }
};

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

export const getDetailsByMovieId = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    displayError(error, 'Failed to fetch movie details');
  }
};
