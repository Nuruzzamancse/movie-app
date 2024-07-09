import { Favorite } from "./store/movieSlice";

export interface Movie {
  _id: string;
  name: string;
  description: string;
  runningTime: number;
  thumbnailUrl: string;
}

export interface Comment {
  _id: string;
  movie: string;
  user: User;
  text: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface MovieState {
  movies: Movie[];
  favorites: Favorite[];
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}