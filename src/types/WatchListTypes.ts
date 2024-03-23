import { Movie } from './MovieTypes';

export interface WatchListContextTypes {
  watchlist: Movie[];
  setWatchlist: (watchlist: Movie[]) => void;
}
