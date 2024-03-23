import { ImageSourcePropType } from 'react-native';

export interface MovieType {
  poster_path: ImageSourcePropType;
  title: string;
  release_date: string;
}

export interface ReviewsResponse {
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

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
  poster_path: string;
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
