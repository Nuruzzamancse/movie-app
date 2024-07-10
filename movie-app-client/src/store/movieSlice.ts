import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';
import { Movie, Comment, MovieState } from '../types';

export interface Favorite {
  _id: string;
  movie: {
    _id: string;
    name: string;
    description: string;
    runningTime: number;
    thumbnailUrl: string;
  };
  user: string;
}


export const fetchMovies = createAsyncThunk<Movie[], void, { rejectValue: string }>(
  'movie/fetchMovies',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/movies');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch movies.");
    }
  }
);

export const fetchFavorites = createAsyncThunk<Favorite[], void, { rejectValue: string }>(
  'movie/fetchFavorites',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/favorites');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch favorites.");
    }
  }
);

export const addFavorite = createAsyncThunk<Favorite, string, { rejectValue: string }>(
  'movie/addFavorite',
  async (movieId, thunkAPI) => {
    try {
      const res = await api.post('/favorites', { movieId });
      return res.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add favorite.");
    }
  }
);

export const getMovie = createAsyncThunk<Movie, string, { rejectValue: string }>(
  'movie/getMovie',
  async (movieId, thunkAPI) => {
    try {
      const res = await api.get(`/movies/${movieId}`);
      return res.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add favorite.");
    }
  }
);

export const removeFavorite = createAsyncThunk<string, string, { rejectValue: string }>(
  'movie/removeFavorite',
  async (movieId, thunkAPI) => {
    try {
      await api.delete(`/favorites/${movieId}`);
      return movieId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to remove favorite.");
    }
  }
);

export const fetchComments = createAsyncThunk<Comment[], string, { rejectValue: string }>(
  'movie/fetchComments',
  async (movieId, thunkAPI) => {
    try {
      const response = await api.get(`/comments?movieId=${movieId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch comments.");
    }
  }
);

interface AddCommentParams {
  movieId: string;
  text: string;
}

export const addComment = createAsyncThunk<Comment, AddCommentParams, { rejectValue: string }>(
  'movie/addComment',
  async ({ movieId, text }, thunkAPI) => {
    try {
      const response = await api.post(`/comments/?movieId=${movieId}`, { text });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add comment.");
    }
  }
);

export const deleteComment = createAsyncThunk<string, string, { rejectValue: string }>(
  'movie/deleteComment',
  async (commentId, thunkAPI) => {
    try {
      const response = await api.delete(`/comments/${commentId}`);
      return response.data.data?.id;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add comment.");
    }
  }
);

const initialState: MovieState = {
  movies: [],
  favorites: [],
  comments: [],
  loading: false,
  error: null,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred while fetching movies';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.error = action.error.message || 'An error occurred while fetching favorites';
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.error = action.error.message || 'An error occurred while adding favorite';
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(fav => fav._id !== action.payload );
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.error = action.error.message || 'An error occurred while removing favorite';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.error = action.error.message || 'An error occurred while fetching comments';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(commentItem=> commentItem._id != action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.error.message || 'An error occurred while adding comment';
      });
  },
});

export default movieSlice.reducer;