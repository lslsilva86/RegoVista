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

export const getYear = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return null;
  }
  return date.getFullYear();
};

export const getHours = (minutes: number) => {
  if (minutes === 0) {
    return 'Runtime unavailable';
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};
