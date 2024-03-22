import { API_KEY, API_BASE_URL } from '@env';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  params: { api_key: API_KEY },
});

export const getTrendingMoviesToday = async () => {
  try {
    const response = await axiosInstance.get('/trending/movie/day');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed fetch trending movies:', error.response?.data.message || error.message);
    } else if (error instanceof Error) {
      console.error('Failed fetch trending movies:', error.message);
    } else {
      console.error('Failed fetch trending movies:', 'An unknown error occurred');
    }
  }
};

export const getTrendingMoviesThisWeek = async () => {
  try {
    const response = await axiosInstance.get('/trending/movie/week');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed fetch trending movies:', error.response?.data.message || error.message);
    } else if (error instanceof Error) {
      console.error('Failed fetch trending movies:', error.message);
    } else {
      console.error('Failed fetch trending movies:', 'An unknown error occurred');
    }
  }
};
