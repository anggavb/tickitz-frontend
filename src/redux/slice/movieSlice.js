import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import env from '../../utils/env';

const initialState = {
  success: false,
  message: '',
  dataUpcoming: null,
  dataMovies: null,
  loadingUpcoming: false,
  loadingMovies: false,
  errorUpcoming: null,
  errorMovies: null,
};

export const getUpcoming = createAsyncThunk('movie/upcoming', async (_, thunkAPI) => {
  try {
    const response = await fetch(`${env.baseAPI}/movies/upcoming`);
    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.error || 'failed to get upcoming movies');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getMovie = createAsyncThunk('movie/getMovie', async (params = {}, thunkAPI) => {
  try {
    const { page = 1, limit = 4, name = '', category = '' } = params;

    const query = new URLSearchParams({
      page,
      limit,
    });

    if (name) query.append('name', name);
    if (category) query.append('category', category);

    const response = await fetch(`${env.baseAPI}/movies?${query.toString()}`);

    const result = await response.json();

    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUpcoming.pending, (state) => {
        state.loadingUpcoming = true;
        state.errorUpcoming = null;
        state.success = false;
      })
      .addCase(getUpcoming.fulfilled, (state, action) => {
        state.loadingUpcoming = false;
        state.success = true;
        state.dataUpcoming = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getUpcoming.rejected, (state, action) => {
        state.loadingUpcoming = false;
        state.errorUpcoming = action.payload;
      })
      .addCase(getMovie.pending, (state) => {
        state.loadingMovies = true;
        state.errorMovies = null;
        state.success = false;
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.loadingMovies = false;
        state.success = true;
        state.dataMovies = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getMovie.rejected, (state, action) => {
        state.loadingMovies = false;
        state.errorMovies = action.payload;
      });
  },
});

export default movieSlice.reducer;
