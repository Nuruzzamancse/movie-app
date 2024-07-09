import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';
import { AuthState, User } from '../types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export const login = createAsyncThunk<User, LoginCredentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post('/users/login', credentials);
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to login.");
    }
  }
);

export const register = createAsyncThunk<User, RegisterUserData, { rejectValue: string }>(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await api.post('/users/register', userData);
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to register.");
    }
  }
);

export const loadUser = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/loadUser',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/users/me');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to load user.");
    }
  }
);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred during login';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred during registration';
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred while loading user data';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;