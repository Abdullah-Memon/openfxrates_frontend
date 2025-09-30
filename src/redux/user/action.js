import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginApi, registerApi, getUserProfileApi } from './service'
import toast from 'react-hot-toast'

export const loginAction = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await loginApi(payload)
      
      // Check for successful status codes
      if (res.status === 200 || res.status === 201) {
        // For successful responses, validate that we have required data

        if (!res.data.token) {
          const errorMessage = 'Unauthorized'
          toast.error(res?.data?.message || errorMessage)
          return rejectWithValue(errorMessage)
        }
        
        toast.success('Login successful!')
        return { status: res.status, data: res.data }
      } else {
        // Any non-success status should be treated as an error
        const errorMessage = res?.data?.message || `Login failed with status ${res.status}`
        toast.error(errorMessage)
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      // Handle network errors and server errors properly
      // Check if this is an HTTP error response (like 401, 400, etc.)
      if (error?.response) {
        const status = error.response.status
        const errorMessage = error.response.data?.message || 
                             error.response.data?.error ||
                             `Login failed with status ${status}`
        toast.error(errorMessage)
        return rejectWithValue(errorMessage)
      } else {
        // Network or other errors
        const errorMessage = error?.message || 'Network error occurred'
        toast.error(errorMessage)
        return rejectWithValue(errorMessage)
      }
    }
  }
)

export const registerAction = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await registerApi(payload)
      
      if (res.status === 201) {
        toast.success('Registration successful!')
        return { status: res.status, data: res.data }
      } else {
        const errorMessage = res?.data?.message || 'Registration failed'
        toast.error(errorMessage)
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Network error occurred'
      toast.error(errorMessage)
      return rejectWithValue(errorMessage)
    }
  }
)

export const getUserProfileAction = createAsyncThunk(
  'auth/getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserProfileApi()
      
      if (res.status === 200) {
        return { status: res.status, data: res.data }
      } else {
        const errorMessage = res?.data?.message || 'Failed to get user profile'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Network error occurred'
      return rejectWithValue(errorMessage)
    }
  }
)