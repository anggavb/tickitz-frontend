import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  success: false,
  data: null,
  message: '',
  error: null,
  loading: false,
};

const baseAPI = import.meta.env.VITE_API_URL || '';

export const signup = createAsyncThunk(`auth/signup`, async (payload, thunkAPI) => {
  try {
    const response = await fetch(`${baseAPI}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.error || 'Register failed');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const activate = createAsyncThunk('auth/activate', async (payload, thunkAPI) => {
  try {
    const response = await fetch(`${baseAPI}/auth/activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'Activation failed');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const requestNewOTP = createAsyncThunk('auth/requestNewOTP', async (payload, thunkAPI) => {
  try {
    const response = await fetch(`${baseAPI}/auth/otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'Failed to request new OTP');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      .addCase(activate.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(activate.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(activate.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      .addCase(requestNewOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(requestNewOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(requestNewOTP.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { resetAuthState } = authSlice.actions;
