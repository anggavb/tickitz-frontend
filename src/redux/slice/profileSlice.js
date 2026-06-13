import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import env from '../../utils/env';

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
    const state = thunkAPI.getState();

    const token = state.auth.token;

    const response = await fetch(`${env.baseAPI}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    return await response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateProfile = createAsyncThunk('profile/update', async (payload, thunkAPI) => {
  try {
    const state = thunkAPI.getState();

    const token = state.auth.token;

    const response = await fetch(`${env.baseAPI}/profile/update`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });
    console.log(response);
    return await response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
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
