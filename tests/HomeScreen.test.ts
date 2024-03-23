// HomeScreen.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import * as movieService from '../src/api/movieService';
import * as authService from '../src/api/authService';
import { useAuth } from '../src/contexts/AuthContext';

// Mock external modules and components
jest.mock('../src/api/movieService');
jest.mock('../src/api/authService');
jest.mock('../src/contexts/AuthContext');
jest.mock('../src/components/Header', () => 'Header');
jest.mock('../src/components/MovieCard', () => 'MovieCard');
jest.mock('../src/components/LoadMoreButton', () => 'LoadMoreButton');

// Setup mock data
const moviesMockData = {
  results: [{ id: 1, title: 'Movie Title' }],
  page: 1,
  total_pages: 2,
};

describe('HomeScreen', () => {
  beforeAll(() => {
    // Mock API responses
    (movieService.getTrendingMoviesToday as jest.Mock).mockResolvedValue(moviesMockData);
    (movieService.getTrendingMoviesThisWeek as jest.Mock).mockResolvedValue(moviesMockData);
    (authService.getAccountId as jest.Mock).mockResolvedValue({ id: 123 });
    // Mock useAuth hook
    (useAuth as jest.Mock).mockReturnValue({
      setAccountId: jest.fn(),
      sessionId: 'fake-session-id',
    });
  });

  it('renders and displays loading state initially', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Loading movies...')).toBeTruthy();
  });

  it('loads and displays movies for today by default', async () => {
    const { getByText, findByText } = render(<HomeScreen />);
    await waitFor(() => expect(findByText('Movie Title')).toBeTruthy());
    expect(getByText('Trending Today')).toBeTruthy();
  });

  it('toggles and loads movies for this week when the switch is toggled', async () => {
    const { getByText, findByText, getByTestId } = render(<HomeScreen />);
    const switchElement = getByTestId('toggleSwitch');

    fireEvent(switchElement, 'onValueChange', false);
    await waitFor(() => expect(findByText('Movie Title')).toBeTruthy());
    expect(getByText('Trending This Week')).toBeTruthy();
  });
});
