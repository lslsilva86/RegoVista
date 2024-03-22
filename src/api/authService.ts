import { API_KEY, API_BASE_URL } from '@env';
import axios from 'axios';
import { UserCredentials, RequestToken } from '../types/AuthTypes';
import { displayError } from '../utils/CommonFunctions';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  params: { api_key: API_KEY },
});

// Create Session (with login)

// Step 1: Request a new token
export const requestToken = async () => {
  try {
    const response = await axiosInstance.get('/authentication/token/new');
    return response.data.request_token;
  } catch (error) {
    displayError(error, 'Failed to fetch request token:');
  }
};

// Step 2: Validate the token with login credentials
export const validateToken = async (credentials: UserCredentials, requestToken: RequestToken) => {
  try {
    const response = await axiosInstance.post('/authentication/token/validate_with_login', {
      username: credentials.username,
      password: credentials.password,
      request_token: requestToken,
    });
    return response.data.success;
  } catch (error) {
    displayError(error, 'Failed to validate request token:');
  }
};

// Step 3: Create a session with the validated token
export const createSession = async (requestToken: RequestToken) => {
  try {
    const response = await axiosInstance.post('/authentication/session/new', {
      request_token: requestToken,
    });
    return response.data.session_id;
  } catch (error) {
    displayError(error, 'Failed to create session:');
  }
};
