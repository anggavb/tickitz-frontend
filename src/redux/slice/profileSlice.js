import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../utils/axios';

const initialState = {
  success: false,
  message: '',
  dataProfile: null,
  loadingProfile: false,
  errorProfile: null,
  loadingUpdate: false,
};

export const getProfile = createAsyncThunk('profile/get', async (_, thunkAPI) => {
  try {
    const response = await apiClient.get('/profile');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});
export const updateProfile = createAsyncThunk('profile/update', async (payload, thunkAPI) => {
  try {
    const response = await apiClient.patch('/profile/update', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loadingProfile = true;
        state.errorProfile = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loadingProfile = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.dataProfile = action.payload.data;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loadingProfile = false;
        state.errorProfile = action.payload || action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loadingProfile = true;
        state.loadingUpdate = true;
        state.errorProfile = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loadingProfile = false;
        state.success = action.payload.success;
        state.message = action.payload.message;

        // 🔥 update data profile setelah berhasil update
        if (action.payload.data) {
          state.dataProfile = action.payload.data;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loadingProfile = false;
        state.errorProfile = action.payload || action.error.message;
      });
  },
});

export default profileSlice.reducer;
