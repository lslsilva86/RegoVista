import axios from 'axios';

export const displayError = (error: any, msg: string) => {
  if (axios.isAxiosError(error)) {
    console.error(msg, error.response?.data.message || error.message);
  } else if (error instanceof Error) {
    console.error(msg, error.message);
  } else {
    console.error(msg, 'An unknown error occurred');
  }
};
