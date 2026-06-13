import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import movieDetailReducer from './slice/movieDetailSlice';
import movieReducer from './slice/movieSlice';
import orderReducer from './slice/orderSlice';
import profileReducer from './slice/profileSlice';
import seatBookingReducer from './slice/seatBookingSlice';

import storageModule from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const storage = storageModule.default ?? storageModule;

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isAuthenticated'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  movie: movieReducer,
  movieDetail: movieDetailReducer,
  order: orderReducer,
  profile: profileReducer,
  seatBooking: seatBookingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
