import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import movieReducer from './slice/movieSlice';
import orderReducer from './slice/orderSlice';
import profileReducer from './slice/profileSlice';

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
  order: orderReducer,
  profile: profileReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
