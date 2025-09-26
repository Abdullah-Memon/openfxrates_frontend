import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginApi, registerApi, getUserProfileApi } from './service'
import toast from 'react-hot-toast'

export const loginAction = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await loginApi(payload)
      
      if (res.status === 200) {
        toast.success('Login successful!')
        return { status: res.status, data: res.data }
      } else {
        toast.error(res?.data?.message || 'Login failed')
        return rejectWithValue(res?.data?.message || 'Login failed')
      }
    } catch (error) {
      toast.error('Network error occurred')
      return rejectWithValue('Network error occurred')
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
        toast.error(res?.data?.message || 'Registration failed')
        return rejectWithValue(res?.data?.message || 'Registration failed')
      }
    } catch (error) {
      toast.error('Network error occurred')
      return rejectWithValue('Network error occurred')
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
        return rejectWithValue(res?.data?.message || 'Failed to get user profile')
      }
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)