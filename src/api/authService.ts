import { API_KEY } from '@env';
import axios, { AxiosError } from 'axios';
import { UserCredentials, RequestToken } from '../types/AuthTypes';

const API_BASE_URL = 'https://api.themoviedb.org/3';

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
    if (axios.isAxiosError(error)) {
      console.error('Failed request token:', error.response?.data.message || error.message);
    } else if (error instanceof Error) {
      console.error('Failed request token:', error.message);
    } else {
      console.error('Failed request token:', 'An unknown error occurred');
    }
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
    if (axios.isAxiosError(error)) {
      console.error('Failed to validate token:', error.response?.data.message || error.message);
    } else if (error instanceof Error) {
      console.error('Failed to validate token:', error.message);
    } else {
      console.error('Failed to validate token:', 'An unknown error occurred');
    }
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
    if (axios.isAxiosError(error)) {
      console.error('Failed to create session:', error.response?.data.message || error.message);
    } else if (error instanceof Error) {
      console.error('Failed to create session:', error.message);
    } else {
      console.error('Failed to create session:', 'An unknown error occurred');
    }
  }
};
