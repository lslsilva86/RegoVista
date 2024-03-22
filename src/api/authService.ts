import { API_KEY, API_BASE_URL } from '@env';
import axios from 'axios';
import { UserCredentials, RequestToken } from '../types/AuthTypes';
import { displayError } from '../utils/CommonFunctions';

/**
 * Axios instance configured with base API URL and default parameters including the API key.
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  params: { api_key: API_KEY },
});

/**
 * Requests a new authentication token from the TMDB API.
 * @returns {Promise<string>} A promise that resolves to the new request token.
 */
export const requestToken = async (): Promise<string> => {
  try {
    const response = await axiosInstance.get('/authentication/token/new');
    return response.data.request_token;
  } catch (error) {
    displayError(error, 'Failed to fetch request token:');
    throw error;
  }
};

/**
 * Validates the given request token using the specified user credentials.
 * @param {UserCredentials} credentials The user's login credentials.
 * @param {RequestToken} requestToken The request token to validate.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the token validation.
 */
export const validateToken = async (credentials: UserCredentials, requestToken: RequestToken): Promise<boolean> => {
  try {
    const response = await axiosInstance.post('/authentication/token/validate_with_login', {
      username: credentials.username,
      password: credentials.password,
      request_token: requestToken,
    });
    return response.data.success;
  } catch (error) {
    displayError(error, 'Failed to validate request token:');
    throw error;
  }
};

/**
 * Creates a new session with TMDB API using the validated request token.
 * @param {RequestToken} requestToken A validated request token.
 * @returns {Promise<string>} A promise that resolves to the new session ID.
 */
export const createSession = async (requestToken: RequestToken): Promise<string> => {
  try {
    const response = await axiosInstance.post('/authentication/session/new', {
      request_token: requestToken,
    });
    return response.data.session_id;
  } catch (error) {
    displayError(error, 'Failed to create session:');
    throw error;
  }
};
