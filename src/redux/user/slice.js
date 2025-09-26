import { createSlice } from '@reduxjs/toolkit'
import { loginAction, registerAction, getUserProfileAction } from './action'
import Cookies from 'js-cookie'
import { getCurrentDomain } from '@/utils/baseUrl'

const initialState = {
  userInfo: null,
  isLoading: false,
  error: null,
  isAuthenticated: false
}

export const AuthUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setUserInfoReducer: (state, { payload }) => {
      state.userInfo = payload
      state.isAuthenticated = !!payload
    },
    logoutAction: (state) => {
      state.userInfo = null
      state.isAuthenticated = false
      state.error = null
      Cookies.remove('authToken', { domain: getCurrentDomain() })
      localStorage.removeItem('userInfo')
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: builder => {
    // Login cases
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.userInfo = payload.data
        state.isAuthenticated = true
        state.error = null
        
        // Store token in cookie and user info in localStorage
        Cookies.set('authToken', payload.data.token, {
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          domain: getCurrentDomain()
        })
        localStorage.setItem('userInfo', JSON.stringify(payload.data))
      })
      .addCase(loginAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
        state.userInfo = null
        state.isAuthenticated = false
      })
      
    // Register cases
    builder
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.error = null
        // Don't auto-login after registration, let user sign in
      })
      .addCase(registerAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
      
    // Get user profile cases
    builder
      .addCase(getUserProfileAction.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getUserProfileAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.userInfo = payload.data
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(getUserProfileAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
        // Don't clear authentication state here, might be temporary network issue
      })
  }
})

export const { logoutAction, setUserInfoReducer, clearError } = AuthUserSlice.actions
export default AuthUserSlice.reducer