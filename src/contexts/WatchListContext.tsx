import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie } from '../types/MovieTypes';
import { getWatchlist, addToWatchlist } from '../api/movieWatchlistService';
import { displayError } from '../utils/CommonFunctions';

interface WatchListContextTypes {
  watchlist: Movie[];
  watchlistPages: number;
  fetchWatchlist: (accountId: string, page?: number) => Promise<void>;
  addMovieToWatchlist: (accountId: string, movieId: string, watchlistState: boolean) => Promise<void>;
}

const WatchlistContext = createContext<WatchListContextTypes | undefined>(undefined);

export const useWatchList = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchList must be used within a WatchListProvider');
  }
  return context;
};

interface WatchListProviderProps {
  children: ReactNode;
}

export const WatchListProvider: React.FC<WatchListProviderProps> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [watchlistPages, setWatchlistPages] = useState<number>(0);

  const fetchWatchlist = async (accountId: string, page: number = 1) => {
    try {
      const { movies, totalPages } = await getWatchlist(accountId, page);
      if (page > 1) {
        setWatchlist((prevWatchlist) => [...prevWatchlist, ...movies]);
      } else {
        setWatchlist(movies);
      }
      setWatchlistPages(totalPages);
    } catch (error) {
      displayError(error, 'Failed to fetch watchlist');
    }
  };

  const addMovieToWatchlist = async (accountId: string, movieId: string, watchlistState: boolean) => {
    try {
      await addToWatchlist(accountId, movieId, watchlistState);
      await fetchWatchlist(accountId, 1);
    } catch (error) {
      displayError(error, 'Failed to update watchlist');
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, watchlistPages, fetchWatchlist, addMovieToWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};
