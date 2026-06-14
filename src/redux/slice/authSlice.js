import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import env from '../../utils/env';
import apiClient from '../../utils/axios';

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

// UPDATE PASSWORD
export const changePassword = createAsyncThunk('auth/changePassword', async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;

    const response = await fetch(`${env.baseAPI}/auth/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        new_password: payload.new_password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'Change password failed');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// LOGOUT
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }

    const response = await apiClient.delete(`/auth/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'Logout failed');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//FORGOT PASSWORD
export const forgotPassword = createAsyncThunk('auth/forgot', async (payload, thunkAPI) => {
  try {
    const response = await fetch(`${env.baseAPI}/auth/password/forgot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // mengirim email
      body: JSON.stringify({
        email: payload.email,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'failed to sent email');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//RESET PASSWORD
export const resetPassword = createAsyncThunk('auth/reset', async (payload, thunkAPI) => {
  try {
    // kirim 2 request, body (new_password)dan param berupa token
    const response = await fetch(`${env.baseAPI}/auth/password/reset?token=${payload.token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        new_password: payload.new_password,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'failed to sent email');
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
      state.isAuthenticated = false;
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
          role: action.payload.data?.role,
        };

        state.token = action.payload.data?.token;
        state.isAuthenticated = true;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.message = 'Password updated';

        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.message = 'Logged out successfully';

        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { resetAuthState, logout } = authSlice.actions;
