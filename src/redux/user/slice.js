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
      // Clear Redux state first
      state.userInfo = null
      state.isAuthenticated = false
      state.error = null
      state.isLoading = false
      
      try {
        // Clear authentication cookie with all possible domain configurations
        Cookies.remove('authToken')
        Cookies.remove('authToken', { domain: getCurrentDomain() })
        Cookies.remove('authToken', { domain: `.${getCurrentDomain()}` })
        
        // Clear all possible authentication-related localStorage items
        localStorage.removeItem('userInfo')
        localStorage.removeItem('userData') // Legacy key used in some components
        localStorage.removeItem('authToken') // In case it was stored in localStorage somewhere
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        
        // Clear sessionStorage as well
        sessionStorage.removeItem('userInfo')
        sessionStorage.removeItem('userData')
        sessionStorage.removeItem('authToken')
        sessionStorage.removeItem('token')
        
        console.log('Logout completed: All authentication data cleared')
      } catch (error) {
        console.error('Error during logout cleanup:', error)
        // Even if cleanup fails, ensure state is cleared
      }
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