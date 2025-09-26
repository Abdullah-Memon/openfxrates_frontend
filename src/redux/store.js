import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import AuthUserSlice from './user/slice'
import OtpSlice from './otp/slice'
import PaymentSlice from './payment/slice'

// Combine all reducers
const rootReducer = combineReducers({
  authUser: AuthUserSlice,
  otp: OtpSlice,
  payment: PaymentSlice,
  // Add more slices here as your app grows
})

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['authUser'] // Only persist authentication state (OTP is temporary, don't persist)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})

export const persistor = persistStore(store)