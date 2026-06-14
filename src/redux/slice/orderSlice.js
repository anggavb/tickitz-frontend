import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../utils/axios';

const initialState = {
  success: false,
  message: '',
  dataHistory: null,
  loadingHistory: false,
  errorHistory: null,
};

export const getOrderHistory = createAsyncThunk('order/history', async (_, thunkAPI) => {
  try {
    // const state = thunkAPI.getState();

    // const token = state.auth.token;

    // console.log(token);
    const response = await apiClient.get(`/orders/history`);

    // return await response.json();
    return response;
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
        state.dataHistory = action.payload.data.data;
        state.message = action.payload.message;
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.loadingHistory = false;
        state.errorHistory = action.payload;
      });
  },
});

export default orderSlice.reducer;
