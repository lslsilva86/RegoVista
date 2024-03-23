import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WatchListContextTypes } from '../types/WatchListTypes';
import { Movie } from '../types/MovieTypes';

const WatchlistContext = createContext<WatchListContextTypes>({
  watchlist: [],
  setWatchlist: () => {},
});

export function useWatchList() {
  return useContext(WatchlistContext);
}

interface WatchListProviderProps {
  children: ReactNode;
}

export const WatchListProvider: React.FC<WatchListProviderProps> = ({ children }) => {
  const [watchlist, setWatchlistState] = useState<Movie[]>([]);
  const setWatchlist = (newWatchlist: Movie[]) => {
    setWatchlistState(newWatchlist);
  };

  return <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>{children}</WatchlistContext.Provider>;
};
