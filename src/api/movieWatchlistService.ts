import axios from 'axios';
import { API_KEY, API_READ_ACCESS_TOKEN, API_BASE_URL } from '@env';
import { displayError } from '../utils/CommonFunctions';

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
 * Fetches the user's watchlist.
 *
 * @param {string} accountId The ID of the account.
 * @param {number} page The page of watchlist items to retrieve, default is 1.
 * @returns {Promise<Array<Movie>>} An array of Movie objects in the watchlist.
 */
export const getWatchlist = async (accountId: string, page: number = 1) => {
  try {
    const response = await axiosInstanceWithAccessToken.get(`/account/${accountId}/watchlist/movies`, {
      params: { page },
    });
    const movies = response.data.results;
    const totalPages = response.data.total_pages;
    return { movies, totalPages };
  } catch (error) {
    displayError(error, 'Failed to fetch watchlist');
    throw error;
  }
};

/**
 * Adds or removes a movie from the user's watchlist.
 *
 * @param {string} accountId The ID of the account.
 * @param {string} movieId The ID of the movie to add or remove.
 * @param {boolean} watchlistState True to add to watchlist, false to remove.
 * @returns {Promise} A promise that resolves with the response of the add/remove operation.
 */
export const addToWatchlist = async (accountId: string, movieId: string, watchlistState: boolean) => {
  try {
    const data = {
      media_type: 'movie',
      media_id: parseInt(movieId),
      watchlist: watchlistState,
    };
    const response = await axiosInstanceWithAccessToken.post(`/account/${accountId}/watchlist`, data);
    return response.data;
  } catch (error) {
    displayError(error, 'Failed to update watchlist');
    throw error;
  }
};
