import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import env from '../../utils/env';

const initialState = {
  success: false,
  user: null,
  token: null,
  message: '',
  error: null,
  loading: false,
  isAuthenticated: false,
};

// SIGNUP
export const signup = createAsyncThunk('auth/signup', async (payload, thunkAPI) => {
  try {
    const response = await fetch(`${env.baseAPI}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.error || 'Register failed');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// ACTIVATE
export const activate = createAsyncThunk('auth/activate', async (payload, thunkAPI) => {
  try {
    const response = await fetch(`${env.baseAPI}/auth/activate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

// REQUEST OTP
export const requestNewOTP = createAsyncThunk('auth/requestNewOTP', async (payload, thunkAPI) => {
  try {
    const response = await fetch(`${env.baseAPI}/auth/otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

// SIGNIN
export const signin = createAsyncThunk('auth/signin', async (payload, thunkAPI) => {
  try {
    const response = await fetch(`${env.baseAPI}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'Login failed');
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
      state.message = '';
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.success = false;
      state.error = null;
      state.message = '';
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
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(activate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activate.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(activate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(requestNewOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestNewOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(requestNewOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        state.user = {
          id: action.payload.data?.id,
          photo: action.payload.data?.photo,
        };

        state.token = action.payload.data?.token;
        state.isAuthenticated = true;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { resetAuthState, logout } = authSlice.actions;
