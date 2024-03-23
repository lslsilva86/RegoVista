import { ImageSourcePropType } from 'react-native';

export interface Genre {
  id: number;
  name: string;
}

export interface Language {
  name: string;
  english_name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: ImageSourcePropType;
  tagline: string;
  genres: Genre[];
  homepage: string;
  overview: string;
  vote_average: number;
  release_date: string;
  spoken_languages: Language[];
  runtime: number;
  video: string;
  rating: number;
}

export interface Movies {
  movies: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface Review {
  author: string;
  content: string;
}
export interface Reviews {
  results: Review[];
  page: number;
  total_pages: number;
  total_results: number;
}
