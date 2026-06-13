import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import env from '../../utils/env';

const initialState = {
  success: false,
  message: '',
  dataHistory: null,
  loadingHistory: false,
  errorHistory: null,
};

export const getOrderHistory = createAsyncThunk('order/history', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${env.baseAPI}/orders/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.error || 'failed to get order history');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderHistory.pending, (state) => {
        state.loadingHistory = true;
        state.errorHistory = null;
        state.success = false;
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.loadingHistory = false;
        state.success = true;
        state.dataHistory = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.loadingHistory = false;
        state.errorHistory = action.payload;
      });
  },
});

export default orderSlice.reducer;
